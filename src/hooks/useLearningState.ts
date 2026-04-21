import { useState, useEffect, useCallback } from 'react';
import type { WordCard } from '../data/words';
import type { PretestResult } from '../components/PretestQuiz';

// 单词学习状态
export interface WordLearningStatus {
  wordId: string;
  learnedAt: number; // 学习完成的时间戳
  nextReviewTime: number; // 下次复习时间戳
  reviewCount: number; // 复习次数
  correctCount: number; // 复习正确次数
  incorrectCount: number; // 复习错误次数
}

// 艾宾浩斯遗忘曲线复习间隔 (小时)
const REVIEW_INTERVALS = [1, 24, 72, 168, 336, 720]; // 1h, 1d, 3d, 7d, 14d, 30d

const STORAGE_KEY = 'wordRoots_learningState';

export function useLearningState() {
  const [learningStatus, setLearningStatus] = useState<Map<string, WordLearningStatus>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 加载学习状态
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const map = new Map<string, WordLearningStatus>(parsed);
        setLearningStatus(map);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load learning state:', error);
      setIsLoaded(true);
    }
  }, []);

  // 保存学习状态到 localStorage
  const saveState = useCallback((newState: Map<string, WordLearningStatus>) => {
    try {
      const serialized = JSON.stringify(Array.from(newState.entries()));
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save learning state:', error);
    }
  }, []);

  // 标记单词为已学习
  const markAsLearned = useCallback((wordId: string) => {
    const now = Date.now();
    const nextReview = now + REVIEW_INTERVALS[0] * 60 * 60 * 1000; // 1小时后复习

    const newStatus: WordLearningStatus = {
      wordId,
      learnedAt: now,
      nextReviewTime: nextReview,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0
    };

    const newState = new Map(learningStatus);
    newState.set(wordId, newStatus);
    setLearningStatus(newState);
    saveState(newState);
  }, [learningStatus, saveState]);

  // 标记多个单词为已学习 (批量操作)
  const markManyAsLearned = useCallback((wordIds: string[]) => {
    const now = Date.now();
    const nextReview = now + REVIEW_INTERVALS[0] * 60 * 60 * 1000;

    const newState = new Map(learningStatus);
    wordIds.forEach(wordId => {
      newState.set(wordId, {
        wordId,
        learnedAt: now,
        nextReviewTime: nextReview,
        reviewCount: 0,
        correctCount: 0,
        incorrectCount: 0
      });
    });
    setLearningStatus(newState);
    saveState(newState);
  }, [learningStatus, saveState]);

  // 更新复习结果
  const updateReviewResult = useCallback((wordId: string, isCorrect: boolean) => {
    const current = learningStatus.get(wordId);
    if (!current) return;

    const now = Date.now();
    let nextReviewTime = now;
    let newReviewCount = current.reviewCount + 1;
    let newCorrectCount = current.correctCount + (isCorrect ? 1 : 0);
    let newIncorrectCount = current.incorrectCount + (isCorrect ? 0 : 1);

    // 根据正确率和复习次数决定下次复习时间
    if (isCorrect) {
      // 回答正确,延长复习间隔
      const intervalIndex = Math.min(current.reviewCount, REVIEW_INTERVALS.length - 1);
      nextReviewTime = now + REVIEW_INTERVALS[intervalIndex] * 60 * 60 * 1000;
    } else {
      // 回答错误,重置到第一次复习间隔
      nextReviewTime = now + REVIEW_INTERVALS[0] * 60 * 60 * 1000;
    }

    const newState = new Map(learningStatus);
    newState.set(wordId, {
      ...current,
      nextReviewTime,
      reviewCount: newReviewCount,
      correctCount: newCorrectCount,
      incorrectCount: newIncorrectCount
    });
    setLearningStatus(newState);
    saveState(newState);
  }, [learningStatus, saveState]);

  // 获取待复习的单词
  const getWordsToReview = useCallback((allWords: WordCard[]): WordCard[] => {
    const now = Date.now();
    return allWords.filter(word => {
      const status = learningStatus.get(word.id);
      return status && status.nextReviewTime <= now;
    });
  }, [learningStatus]);

  // 获取单词学习状态
  const getWordStatus = useCallback((wordId: string): WordLearningStatus | undefined => {
    return learningStatus.get(wordId);
  }, [learningStatus]);

  // 清除所有学习数据
  const clearAllData = useCallback(() => {
    const newState = new Map<string, WordLearningStatus>();
    setLearningStatus(newState);
    saveState(newState);
  }, [saveState]);

  // 从预测试结果中筛选出需要学习的单词
  const filterWordsToLearn = useCallback((pretestResults: PretestResult[], allWords: WordCard[]): WordCard[] => {
    const wrongAnswerIds = new Set(
      pretestResults
        .filter(result => !result.isCorrect)
        .map(result => result.wordId)
    );

    return allWords.filter(word => wrongAnswerIds.has(word.id));
  }, []);

  return {
    learningStatus,
    isLoaded,
    markAsLearned,
    markManyAsLearned,
    updateReviewResult,
    getWordsToReview,
    getWordStatus,
    clearAllData,
    filterWordsToLearn
  };
}
