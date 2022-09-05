import faker from 'faker';
import {City, Host, Hotel, Location} from '../types/hotel.type';
import {User} from '../types/user.type';
import {Comment} from '../types/comment.type';
import {MAX_RATING} from '../constants';

const MAX_FAKE_ID = 15;
const MAX_FAKE_IMAGES = 6;

export const makeFakeLocation = (): Location => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number(),
});

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: String(faker.address.cityName()),
});

export const makeFakeUser = (): User => ({
  avatarUrl: faker.internet.url(),
  email: faker.internet.email(),
  id: faker.datatype.number(),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
  token: faker.datatype.string(),
});

export const makeFakeErrorMessage = (): string => faker.datatype.string();

export const makeFakeHost = (): Host => ({
  avatarUrl: faker.datatype.string(),
  id: faker.datatype.number(),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
});

export const makeFakePlace = (): Hotel => ({
  bedrooms: faker.datatype.number(),
  city: makeFakeCity(),
  description: faker.datatype.string(),
  goods: [faker.datatype.string()],
  host: makeFakeHost(),
  id: faker.datatype.number(MAX_FAKE_ID),
  images: new Array(MAX_FAKE_IMAGES)
    .fill(null)
    .map(() => faker.image.image()),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: faker.datatype.number(),
  previewImage: faker.datatype.string(),
  price: faker.datatype.number(),
  rating: faker.datatype.number(MAX_RATING),
  title: faker.datatype.string(),
  type: faker.datatype.string(),
});

export const makeFakeComment = (): Comment => ({
  comment: faker.datatype.string(),
  date: String(faker.datatype.datetime),
  id: faker.datatype.number(),
  rating: faker.datatype.number(MAX_RATING),
  user: makeFakeHost(),
});
