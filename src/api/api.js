// src/api/api.js

const mockDelay = (data, delay = 500) =>
    new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const getPopularBooks = () =>
    mockDelay([
        {
            id: '1',
            title: 'Rich Dad Poor Dad',
            author: 'Robert Kiyosaki',
            rating: 4.8,
            image: 'https://placehold.co/100x150/png',
            description: 'Learn about financial independence.',
        },
        {
            id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            rating: 4.7,
            image: 'https://placehold.co/100x150/png',
            description: 'Build better habits with small changes.',
        },
    ]);

export const getAuthors = () =>
    mockDelay([
        { id: 'a1', image: 'https://placehold.co/50X50/png', name: 'Nguyễn Nhật Ánh' },
        { id: 'a2', image: 'https://placehold.co/50X50/png', name: 'Đặng Lê Nguyên Vũ' },
        { id: 'a3', image: 'https://placehold.co/50X50/png', name: 'Minh Long' },
    ]);

export const getGenres = () =>
    mockDelay([
        { id: 'g1', name: 'Sách kinh doanh' },
        { id: 'g2', name: 'Sách kỹ năng' },
        { id: 'g3', name: 'Sách khoa học' },
    ]);

export const getNewBooks = () =>
    mockDelay([
        {
            id: 'n1',
            title: 'The Psychology of Money',
            author: 'Morgan Housel',
            rating: 4.6,
            image: 'https://placehold.co/80x120/png',
            description: 'How money decisions are made.',
        },
        {
            id: 'n2',
            title: 'Deep Work',
            author: 'Cal Newport',
            rating: 4.5,
            image: 'https://placehold.co/80x120/png',
            description: 'Focused success in a distracted world.',
        },
    ]);


// Mock data
const books = [
    {
        id: 'b1',
        title: 'Zero to One',
        author: 'Peter Thiel',
        rating: 4.4,
        image: 'https://placehold.co/80x120/png',
        description: 'Notes on startups and innovation.',
        genre: 'Kinh doanh',
    },
    {
        id: 'b2',
        title: 'The Lean Startup',
        author: 'Eric Ries',
        rating: 4.3,
        image: 'https://placehold.co/80x120/png',
        description: 'Entrepreneurship reimagined.',
        genre: 'Kinh doanh',
    },
    {
        id: 'b3',
        title: 'Deep Work',
        author: 'Cal Newport',
        rating: 4.6,
        image: 'https://placehold.co/80x120/png',
        description: 'Focus without distraction.',
        genre: 'Kỹ năng',
    },
    {
        id: 'b4',
        title: 'Atomic Habits',
        author: 'James Clear',
        rating: 4.8,
        image: 'https://placehold.co/80x120/png',
        description: 'Tiny changes, remarkable results.',
        genre: 'Kỹ năng',
    },
];

export const getBooksByGenre = (genre) => {
    const filtered = books.filter((book) => book.genre === genre);
    return mockDelay(filtered);
};