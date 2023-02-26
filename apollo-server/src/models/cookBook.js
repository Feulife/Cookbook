import mongoose from 'mongoose';

export const cookBook = mongoose.model('CookBook', {title: String, year: Number});