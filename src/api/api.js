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
            image: 'https://omahreview.com/wp-content/uploads/2021/12/rich-dad-poor-dad-1-6048b169d541df531d47f612.jpg',
            description: 'Learn about financial independence.',
        },
        {
            id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            rating: 4.7,
            image: 'https://media.shortform.com/covers/png/atomic-habits-cover@8x.png',
            description: 'Build better habits with small changes.',
        },
    ]);

export const getAuthors = () =>
    mockDelay([
        { id: 'a1', image: 'https://simg.zalopay.com.vn/zlp-website/assets/nna_1_0326bcb452.jpg', name: 'Nguyễn Nhật Ánh' },
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
            image: 'https://hlbookstore.in/wp-content/uploads/2022/06/The-Psychology-Of-Money-By-Morgan-Housel.jpg',
            description: 'How money decisions are made.',
        },
        {
            id: 'n2',
            title: 'Deep Work',
            author: 'Cal Newport',
            rating: 4.6,
            image: 'https://m.media-amazon.com/images/I/71din4TLubL.jpg',
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
        image: 'https://th.bing.com/th/id/OIP.ThqViW52oLvRIBD297nOcAHaLo?rs=1&pid=ImgDetMain',
        description: 'Notes on startups and innovation.',
        genre: 'Kinh doanh',
    },
    {
        id: 'b2',
        title: 'The Lean Startup',
        author: 'Eric Ries',
        rating: 4.3,
        image: 'https://th.bing.com/th/id/R.9de82ef2da08008a74aa3afbec9f3cf9?rik=zaas85eGaea9BQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-T-d3JPMr-Uk%2fUPshLuidy6I%2fAAAAAAAAFbU%2fvOiHd0qgnC4%2fs1600%2flean-startup_book-cover.jpeg&ehk=O90jlIAsVo0HEm3VJD7I%2b0%2fbWRp8HxsmQwJdugopPLU%3d&risl=&pid=ImgRaw&r=0',
        description: 'Entrepreneurship reimagined.',
        genre: 'Kinh doanh',
    },
    {
        id: 'b3',
        title: 'Deep Work',
        author: 'Cal Newport',
        rating: 4.6,
        image: 'https://m.media-amazon.com/images/I/71din4TLubL.jpg',
        description: 'Focus without distraction.',
        genre: 'Kỹ năng',
    },
    {
        id: 'b4',
        title: 'Atomic Habits',
        author: 'James Clear',
        rating: 4.8,
        image: 'https://media.shortform.com/covers/png/atomic-habits-cover@8x.png',
        description: 'Tiny changes, remarkable results.',
        genre: 'Kỹ năng',
    },
];

export const getBooksByGenre = (genre) => {
    const filtered = books.filter((book) => book.genre === genre);
    return mockDelay(filtered);
};

export const fetchPopularBooks = async (keyword = '') => {
    const trimmedKeyword = keyword.trim().toLowerCase();

    if (!trimmedKeyword) {
        return books
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
    }

    return books.filter(book =>
        book.title.toLowerCase().includes(trimmedKeyword) ||
        book.author.toLowerCase().includes(trimmedKeyword)
    );
};

export const fetchPopularAuthors = async () => {
    return Array.from({ length: 5 }, (_, i) => ({
        id: `${i + 1}`,
        name: 'Em Bill Duong',
        img: 'https://placehold.co/40/png',
    }));
};

// services/api.js (ví dụ)
export const fetchLanguages = async () => {
    // Giả lập gọi API
    return ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Nhật'];
};

export const fetchGenres = async () => {
    return ['Trinh thám', 'Khoa học', 'Tình cảm', 'Phiêu lưu'];
};
