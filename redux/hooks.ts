import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Кастомный хук для типизированного dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Кастомный хук для типизированного useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;