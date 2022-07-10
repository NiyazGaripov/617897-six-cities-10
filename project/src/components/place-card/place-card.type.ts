type PlaceCardProps = {
  template: 'cities' | 'favorites';
  isFavorite: boolean;
  isPremium: boolean;
  previewImage: string;
  price: number;
  title: string;
  type: string;
};

export default PlaceCardProps;
