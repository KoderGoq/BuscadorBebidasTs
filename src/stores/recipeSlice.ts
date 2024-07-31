import { StateCreator } from 'zustand';
import { getCategories, getRecipeById, getRecipies } from '../services/RecipeService';
import { Categories, Drink, Drinks, Recipe, SearchFilter } from '../types';
import { FavoritesSliceType } from './favoriteSlice';


export type RecipeSliceTypee = {
  categories: Categories,
  drinks: Drinks,
  selectedRecipe: Recipe,
  modal: boolean,
  fetchCategories: () => Promise<void>,
  searchRecipies: (SearchFilter: SearchFilter) => void,
  selectRecipe: (id: Drink['idDrink']) => void,
  closeModal: () => void
}

export const createRecipeSlite: StateCreator<RecipeSliceTypee & FavoritesSliceType, [], [], RecipeSliceTypee> = (set) => ({
  categories: {
    drinks: []
  },
  drinks: {
    drinks: []
  },
  selectedRecipe: {} as Recipe,
  modal: false,

  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories
    })
  },
  searchRecipies: async (filters) => {
    const drinks = await getRecipies(filters);
    set({
      drinks
    })
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set({
      selectedRecipe,
      modal: true
    })
  },
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe
    })
  }
})