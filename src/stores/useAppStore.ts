import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RecipeSliceTypee, createRecipeSlite } from './recipeSlice';
import { FavoritesSliceType, createFavoritesSlices } from './favoriteSlice';
import { NotificationSliceType, createNotificationSlice } from './notificationSlice';


export const useAppStore = create<RecipeSliceTypee & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
  ...createRecipeSlite(...a),
  ...createFavoritesSlices(...a),
  ...createNotificationSlice(...a)
})))