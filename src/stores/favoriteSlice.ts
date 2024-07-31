import { StateCreator } from 'zustand';
import { Recipe } from '../types';
import { createRecipeSlite, RecipeSliceTypee } from './recipeSlice';
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';


export type FavoritesSliceType = {
  favorites: Recipe[],
  handleClickFavorite: (recipe: Recipe) => void,
  favoriteExist: (id: Recipe['idDrink']) => boolean,
  loadFromStorage: () => void
}

export const createFavoritesSlices: StateCreator<FavoritesSliceType & RecipeSliceTypee & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
  favorites: [],

  handleClickFavorite: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
      }))
      createNotificationSlice(set, get, api).showNotification({ text: 'Se Elimino de Favoritos', error: false });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe]
      }))
      createNotificationSlice(set, get, api).showNotification({ text: 'Se agrego a Favoritos', error: false });
    }

    createRecipeSlite(set, get, api).closeModal()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))

  },

  favoriteExist: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },

  loadFromStorage: () => {
    const storageFavorites = localStorage.getItem('favorites');

    if (storageFavorites) {
      set({
        favorites: JSON.parse(storageFavorites)
      })
    }
  }
})