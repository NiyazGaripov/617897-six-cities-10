import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Comment} from '../../types/comment.type';
import {APIRoute} from '../../constants';

type ReviewData = {
  id: number,
  rating: number
  comment: string
};

export const fetchCommentsAction = createAsyncThunk<Comment[], number, {
  extra: AxiosInstance
}>(
  'comments/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const addNewCommentAction = createAsyncThunk<Comment[], ReviewData, {
  extra: AxiosInstance
}>(
  'comments/addNewComment',
  async ({comment, rating, id}, {extra: api}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);
