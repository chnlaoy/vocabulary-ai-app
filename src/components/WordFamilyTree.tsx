import { Trees, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { wordCards } from '../data/words';

interface TreeNode {
  id: string;
  label: string;
  meaning: string;
  children?: TreeNode[];
  expanded?: boolean;
}

export function WordFamilyTree() {
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // 构建词族树数据
  const buildWordFamilyTree = (): Record<string, TreeNode> => {
    const roots: Record<string, TreeNode> = {};

    wordCards.forEach(card => {
      const rootForm = card.root.form;
      if (!roots[rootForm]) {
        roots[rootForm] = {
          id: rootForm,
          label: rootForm,
          meaning: `${card.root.meaning} (${card.root.origin})`,
          children: []
        };
      }

      // 添加单词作为子节点
      const wordNode: TreeNode = {
        id: card.word,
        label: card.word,
        meaning: card.definition.split('；')[0],
        children: []
      };

      // 添加相关词作为孙节点
      card.relatedWords.forEach((related, index) => {
        const relatedNode: TreeNode = {
          id: `${card.word}-${index}`,
          label: related.word,
          meaning: related.meaning
        };
        wordNode.children!.push(relatedNode);
      });

      roots[rootForm].children!.push(wordNode);
    });

    return roots;
  };

  const wordFamilies = buildWordFamilyTree();
  const rootKeys = Object.keys(wordFamilies);

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const renderNode = (node: TreeNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="flex flex-col">
        {/* 节点 */}
        <div
          className={`
            flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all
            ${depth === 0 ? 'bg-indigo-50 hover:bg-indigo-100' : ''}
            ${depth === 1 ? 'bg-purple-50 hover:bg-purple-100 ml-4' : ''}
            ${depth === 2 ? 'bg-pink-50 hover:bg-pink-100 ml-8' : ''}
            ${selectedRoot === node.id ? 'ring-2 ring-indigo-500' : ''}
          `}
          onClick={() => {
            if (depth === 0) {
              setSelectedRoot(node.id);
              toggleExpand(node.id);
            } else if (hasChildren) {
              toggleExpand(node.id);
            }
          }}
        >
          {depth === 0 && <Trees className="w-4 h-4 text-indigo-600" />}
          {hasChildren && depth > 0 && (
            isExpanded ? (
              <ChevronRight className="w-4 h-4 text-gray-500 rotate-90" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )
          )}
          {!hasChildren && depth > 0 && <div className="w-4 h-4" />}

          <div className="flex-1">
            <div className={`font-medium ${depth === 0 ? 'text-indigo-900' : depth === 1 ? 'text-purple-900' : 'text-pink-900'}`}>
              {node.label}
            </div>
            <div className="text-xs text-gray-600">{node.meaning}</div>
          </div>

          {hasChildren && depth === 0 && (
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
              {node.children!.length} 个单词
            </span>
          )}
        </div>

        {/* 子节点 */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col">
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trees className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">词族树可视化</h2>
      </div>

      <p className="text-gray-600 mb-6">
        点击词根展开查看相关单词和派生词,帮助您建立词汇网络。
      </p>

      {rootKeys.length > 0 ? (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {rootKeys.map(rootKey => renderNode(wordFamilies[rootKey]))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Trees className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>暂无词族数据</p>
        </div>
      )}

      {/* 使用提示 */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
        <h3 className="font-semibold text-indigo-900 mb-2">使用技巧</h3>
        <ul className="space-y-1 text-sm text-indigo-700">
          <li>• 点击词根节点可展开或收起整个词族</li>
          <li>• 通过视觉关联记忆同一词根下的所有单词</li>
          <li>• 关注词根含义在派生词中的应用</li>
          <li>• 使用箭头图标浏览词族层级结构</li>
        </ul>
      </div>
    </div>
  );
}
