// src/api/api.js

const mockDelay = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const getPopularBooks = () =>
  mockDelay([
    {
      id: "1",
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      rating: 4.9,
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/df/7d/da/d340edda2b0eacb7ddc47537cddb5e08.jpg",
      description: "Nghệ thuật thu phục lòng người và đối nhân xử thế.",
    },
    {
      id: "2",
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      rating: 4.8,
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/45/3b/fc/aa81d0a534b45706ae1eee1e344e80d9.jpg",
      description: "Hành trình theo đuổi vận mệnh và khám phá bản thân.",
    },
    {
      id: "3",
      title: "Cây Cam Ngọt Của Tôi",
      author: "José Mauro de Vasconcelos",
      rating: 4.7,
      image:
        "https://salt.tikicdn.com/cache/w1200/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg",
      description:
        "Câu chuyện cảm động về tuổi thơ nghèo khó nhưng đầy mơ mộng.",
    },
    {
      id: "4",
      title: "Tôi Tài Giỏi, Bạn Cũng Thế",
      author: "Adam Khoo",
      rating: 4.6,
      image:
        "https://voiz-prod.s3-wewe.cloud.cmctelecom.vn/uploads/avatar/filename/414479/a614f71d7c6fe6bb.png",
      description: "Phương pháp học tập hiệu quả và phát triển bản thân.",
    },
    {
      id: "5",
      title: "Người Giàu Có Nhất Thành Babylon",
      author: "George S. Clason",
      rating: 4.8,
      image:
        "https://product.hstatic.net/200000060620/product/1-nguoi-giau-co-nhat-thanh-babylon-mt_6db9505c4c7b41f5b3d5ea1df482075e.jpg",
      description:
        "Những bí quyết tài chính từ thời cổ đại vẫn còn giá trị đến ngày nay.",
    },
    {
      id: "6",
      title: "Thiên Tài Bên Trái, Kẻ Điên Bên Phải",
      author: "Cao Minh",
      rating: 4.7,
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630313960i/50908574.jpg",
      description: "Ranh giới mong manh giữa thiên tài và kẻ điên.",
    },
    {
      id: "7",
      title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      author: "Rosie Nguyễn",
      rating: 4.5,
      image:
        "https://nld.mediacdn.vn/2018/3/24/sach-1521858607292758740290.jpg",
      description: "Những trải nghiệm và bài học quý giá trong tuổi trẻ.",
    },
    {
      id: "8",
      title: "Hành Trình Về Phương Đông",
      author: "Baird T. Spalding",
      rating: 4.9,
      image: "https://firstnews.vn/upload/products/original/-1728469781.jpg",
      description: "Câu chuyện về những bí ẩn tâm linh phương Đông.",
    },
    {
      id: "9",
      title: "Dám Nghĩ Lớn",
      author: "David J. Schwartz",
      rating: 4.6,
      image:
        "https://salt.tikicdn.com/cache/w300/media/catalog/product/d/a/dam_nghi_lon_1.jpg",
      description: "Cách tư duy để thành công và hạnh phúc.",
    },
    {
      id: "10",
      title: "Không Gia Đình",
      author: "Hector Malot",
      rating: 4.8,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7w-ZJGSvtnJadtU5bRTAsBHVn-bAzuKSZrA&s",
      description: "Hành trình đầy thử thách của cậu bé Rémi mồ côi.",
    },
  ]);

export const getAuthors = () =>
  mockDelay([
    {
      id: "a1",
      image:
        "https://simg.zalopay.com.vn/zlp-website/assets/nna_1_0326bcb452.jpg",
      name: "Nguyễn Nhật Ánh",
      bookCount: 32,
      biography:
        "Nguyễn Nhật Ánh (sinh ngày 7 tháng 5 năm 1955) là một nhà văn, nhà thơ, bình luận viên Việt Nam. Ông được biết đến qua nhiều tác phẩm văn học về đề tài tuổi mới lớn, các tác phẩm của ông rất được độc giả ưa chuộng và nhiều tác phẩm đã được chuyển thể thành phim.",
    },
    {
      id: "a2",
      image:
        "https://cdn-i2.vtcnews.vn/files/quynh.chi/2018/03/31/vu-1-1200064.jpg",
      name: "Đặng Lê Nguyên Vũ",
      bookCount: 15,
      biography:
        "Đặng Lê Nguyên Vũ (sinh năm 1971) là một doanh nhân Việt Nam, người sáng lập và chủ tịch của Tập đoàn cà phê Trung Nguyên. Ông được biết đến như một doanh nhân thành đạt và là tác giả của nhiều cuốn sách về kinh doanh, lãnh đạo và phát triển bản thân.",
    },
    {
      id: "a3",
      image:
        "https://upload.wikimedia.org/wikipedia/vi/7/73/Nhavan_t%C3%B4_ho%C3%A0i.jpg",
      name: "Tô Hoài",
      bookCount: 28,
      biography:
        "Tô Hoài (tên thật là Nguyễn Sen; 27 tháng 9 năm 1920 – 6 tháng 7 năm 2014) là một nhà văn Việt Nam. Ông được biết đến qua nhiều tác phẩm văn học nổi tiếng như Dế Mèn phiêu lưu ký, Truyện Tây Bắc, và nhiều tác phẩm khác. Ông đã nhận được nhiều giải thưởng văn học quan trọng.",
    },
    {
      id: "a4",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b0/Portrait_of_Nam_Cao.jpg",
      name: "Nam Cao",
      bookCount: 20,
      biography:
        "Nam Cao (tên thật là Trần Hữu Tri; 29 tháng 10 năm 1915 – 30 tháng 11 năm 1951) là một nhà văn, nhà báo Việt Nam. Ông là một trong những nhà văn hiện thực xuất sắc của Việt Nam với các tác phẩm nổi tiếng như Chí Phèo, Lão Hạc, và nhiều truyện ngắn khác.",
    },
    {
      id: "a5",
      image:
        "https://file3.qdnd.vn/data/images/14/2022/10/05/thanhminh/nv%20vu%20trong%20phung%201.jpg?dpi=150&quality=100&w=870",
      name: "Vũ Trọng Phụng",
      bookCount: 18,
      biography:
        "Vũ Trọng Phụng (1912 – 13 tháng 10 năm 1939) là một nhà văn, nhà báo Việt Nam. Ông nổi tiếng với các tác phẩm phê phán xã hội như Số Đỏ, Giông Tố, Làm Đĩ, và nhiều phóng sự, tiểu thuyết khác. Ông được coi là một trong những nhà văn hiện thực phê phán xuất sắc nhất của Việt Nam.",
    },
    {
      id: "a6",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Xuandieupoet.jpg",
      name: "Xuân Diệu",
      bookCount: 25,
      biography:
        "Xuân Diệu (tên thật là Ngô Xuân Diệu; 2 tháng 2 năm 1916 – 18 tháng 12 năm 1985) là một nhà thơ Việt Nam. Ông được mệnh danh là 'Ông hoàng của thơ tình' trong nền văn học Việt Nam hiện đại với nhiều tập thơ nổi tiếng như Thơ Thơ, Gửi Hương Cho Gió, và nhiều tác phẩm khác.",
    },
    {
      id: "a7",
      image:
        "https://upload.wikimedia.org/wikipedia/vi/2/2e/Tu%C3%A2n_Nguy%E1%BB%85n.jpg",
      name: "Nguyễn Tuân",
      bookCount: 22,
      biography:
        "Nguyễn Tuân (10 tháng 7 năm 1910 – 28 tháng 7 năm 1987) là một nhà văn Việt Nam. Ông nổi tiếng với phong cách văn chương tài hoa, uyên bác và độc đáo. Các tác phẩm tiêu biểu của ông bao gồm Vang Bóng Một Thời, Chùa Đàn, Thiếu Quê Hương, và nhiều tác phẩm khác.",
    },
    {
      id: "a8",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/fe/Nguy%E1%BB%85n_Nguy%C3%AAn_H%E1%BB%93ng.jpg",
      name: "Nguyễn Hồng",
      bookCount: 16,
      biography:
        "Nguyễn Hồng (1918 – 1982) là một nhà văn Việt Nam. Ông nổi tiếng với các tác phẩm về cuộc sống của người lao động nghèo khổ, đặc biệt là tiểu thuyết 'Bỉ Vỏ' được coi là một trong những tác phẩm quan trọng của văn học Việt Nam hiện đại.",
    },
    {
      id: "a9",
      image:
        "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c8078506a83d58faad74ba97a19339058b7a7006ebb7de70b7ecc1b77ff9be002f623bb81cc02e8ad39d0721b4417e86f96300/huy-can4-9561.jpg.webp",
      name: "Huy Cận",
      bookCount: 24,
      biography:
        "Huy Cận (tên thật là Cù Huy Cận; 31 tháng 5 năm 1919 – 19 tháng 2 năm 2005) là một nhà thơ, nhà văn và chính khách Việt Nam. Ông là một trong những nhà thơ tiêu biểu của phong trào Thơ Mới với các tập thơ nổi tiếng như Lửa Thiêng, Vũ Trụ Ca, và nhiều tác phẩm khác.",
    },
    {
      id: "a10",
      image: "https://hoinhabaonghean.vn/uploads/news/2022_12/ta-tam-7564.jpg",
      name: "Hồ Xuân Hương",
      bookCount: 12,
      biography:
        "Hồ Xuân Hương (1772 – 1822) là một nữ thi sĩ Việt Nam thời Lê mạt - Nguyễn sơ. Bà nổi tiếng với những bài thơ táo bạo, châm biếm và đầy tính nhân văn. Thơ của bà thường sử dụng lối chơi chữ, ẩn dụ kép để phê phán xã hội phong kiến và đề cao quyền phụ nữ.",
    },
  ]);

export const getGenres = () =>
  mockDelay([
    { id: "g1", name: "Sách kinh doanh" },
    { id: "g2", name: "Sách kỹ năng" },
    { id: "g3", name: "Sách khoa học" },
    { id: "g4", name: "Sách tâm lý" },
    { id: "g5", name: "Sách tình cảm" },
    { id: "g6", name: "Sách thiếu nhi" },
    { id: "g7", name: "Sách văn học" },
  ]);

export const getNewBooks = () =>
  mockDelay([
    {
      id: "n1",
      title: "Tâm Lý Học Về Tiền",
      author: "Morgan Housel",
      rating: 4.6,
      image:
        "https://nhasachphuongnam.com/images/detailed/191/tam-ly-hoc-ve-tien.jpg",
      description:
        "Khám phá cách con người suy nghĩ về tiền bạc và cách để đưa ra quyết định tài chính thông minh hơn.",
    },
    {
      id: "n2",
      title: "Làm Việc Chuyên Sâu",
      author: "Cal Newport",
      rating: 4.6,
      image:
        "https://thuvienonline.org/wp-content/uploads/2022/08/deep-work-lam-ra-lam-choi-ra-choi.jpg",
      description:
        "Phương pháp làm việc tập trung cao độ trong thế giới đầy phân tâm.",
    },
    {
      id: "n3",
      title: "Dám Bị Ghét",
      author: "Koga Fumitake & Kishimi Ichiro",
      rating: 4.7,
      image:
        "https://tiki.vn/blog/wp-content/uploads/2024/08/dam-bi-ghet-3.jpg",
      description:
        "Cuốn sách giúp bạn can đảm sống cuộc đời mình mong muốn mà không bận tâm đến đánh giá của người khác.",
    },
    {
      id: "n4",
      title: "Hiểu Về Trái Tim",
      author: "Minh Niệm",
      rating: 4.8,
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1473045794i/13640125.jpg",
      description:
        "Hành trình khám phá bản chất của tâm hồn và cách chữa lành những tổn thương tinh thần.",
    },
    {
      id: "n5",
      title: "Rèn Luyện Tư Duy Phản Biện",
      author: "Albert Rutherford",
      rating: 4.5,
      image:
        "https://cdn1.fahasa.com/media/flashmagazine/images/page_images/ren_luyen_tu_duy_phan_bien/2023_08_11_17_03_08_1-390x510.jpg",
      description:
        "Những công cụ và kỹ thuật để phân tích và đánh giá thông tin một cách logic và hiệu quả.",
    },
  ]);

// Mock data
const books = [
  {
    id: "b1",
    title: "Từ Số 0 Đến Số 1",
    author: "Peter Thiel",
    rating: 4.4,
    image:
      "https://down-vn.img.susercontent.com/file/86fcf55f1503904f7236346e5c1b7b25",
    description:
      "Những bí quyết xây dựng doanh nghiệp khởi nghiệp và đổi mới sáng tạo.",
    genre: "Kinh doanh",
  },
  {
    id: "b2",
    title: "Khởi Nghiệp Tinh Gọn",
    author: "Eric Ries",
    rating: 4.3,
    image: "https://data.tiasach.com/book/44/44-the-lean-startup-bg-06y.webp",
    description: "Phương pháp khởi nghiệp hiệu quả trong thời đại mới.",
    genre: "Kinh doanh",
  },
  {
    id: "b3",
    title: "Làm Việc Chuyên Sâu",
    author: "Cal Newport",
    rating: 4.6,
    image:
      "https://salt.tikicdn.com/cache/w1200/ts/product/e1/04/27/af1a902ea3520c2a5bdc8b2dc9e658a0.jpg",
    description: "Tập trung cao độ trong thế giới đầy phân tâm.",
    genre: "Kỹ năng",
  },
  {
    id: "b4",
    title: "Thói Quen Nguyên Tử",
    author: "James Clear",
    rating: 4.8,
    image:
      "https://sachnoi.top/upload/images/atomi-habits-thoi-quen-nguyen-tu.webp",
    description:
      "Thay đổi nhỏ, kết quả lớn - Cách xây dựng thói quen tốt và phá vỡ thói quen xấu.",
    genre: "Kỹ năng",
  },
];

export const getBooksByGenre = (genre) => {
  const filtered = books.filter((book) => book.genre === genre);
  return mockDelay(filtered);
};

export const fetchPopularBooks = async (keyword = "") => {
  const trimmedKeyword = keyword.trim().toLowerCase();

  // Lấy tất cả sách từ các nguồn
  const popularBooks = await getPopularBooks();
  const newBooks = await getNewBooks();
  const allBooks = [...popularBooks, ...newBooks, ...books];

  if (!trimmedKeyword) {
    // Trả về 3 cuốn sách phổ biến nhất khi không có từ khóa tìm kiếm
    return popularBooks.slice(0, 3);
  }

  // Tìm kiếm trong tất cả sách
  return allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(trimmedKeyword) ||
      book.author.toLowerCase().includes(trimmedKeyword)
  );
};

export const fetchPopularAuthors = async () => {
  // Lấy danh sách tác giả từ getAuthors
  const authors = await getAuthors();

  // Chuyển đổi định dạng để phù hợp với AuthorCard
  return authors.slice(0, 5).map((author) => ({
    id: author.id,
    name: author.name,
    img: author.image, // AuthorCard sử dụng img thay vì image
  }));
};

// services/api.js (ví dụ)
export const fetchLanguages = async () => {
  // Giả lập gọi API
  return ["Tiếng Việt", "Tiếng Anh", "Tiếng Nhật"];
};

export const fetchGenres = async () => {
  return ["Trinh thám", "Khoa học", "Tình cảm", "Phiêu lưu"];
};

export const getBookById = async (id) => {
  console.log("getBookById called with id:", id);

  // Đầu tiên, tìm trong danh sách sách phổ biến
  const popularBooks = await getPopularBooks();
  let book = popularBooks.find((book) => book.id === id);
  if (book) {
    console.log("Book found in popularBooks");
    return book;
  }

  // Nếu không tìm thấy, tìm trong danh sách sách mới
  const newBooks = await getNewBooks();
  book = newBooks.find((book) => book.id === id);
  if (book) {
    console.log("Book found in newBooks");
    return book;
  }

  // Nếu không tìm thấy, tìm trong danh sách sách kinh doanh
  book = books.find((book) => book.id === id);
  if (book) {
    console.log("Book found in books");
    return book;
  }

  // Tìm trong danh sách sách của tác giả
  for (const authorId in authorBooks) {
    const authorBookList = authorBooks[authorId];
    book = authorBookList.find((book) => book.id === id);
    if (book) {
      console.log("Book found in authorBooks for author:", authorId);
      return book;
    }
  }

  console.log("Book not found, returning default");
  // Nếu không tìm thấy, trả về sách mặc định
  return {
    id: id,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    rating: 4.9,
    image: null, // Sẽ sử dụng hình ảnh db.png từ assets
    description: "Nghệ thuật thu phục lòng người và đối nhân xử thế.",
    price: "120.000 VNĐ",
  };
};

// Danh sách sách của từng tác giả
const authorBooks = {
  a1: [
    // Nguyễn Nhật Ánh
    {
      id: "nna1",
      title: "Mắt Biếc",
      author: "Nguyễn Nhật Ánh",
      rating: 4.8,
      description:
        "Mắt Biếc là một tác phẩm được nhiều người bình chọn là hay nhất của Nguyễn Nhật Ánh. Tác phẩm này cũng đã được chuyển thể thành phim điện ảnh vào năm 2019.",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677.jpg",
    },
    {
      id: "nna2",
      title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      author: "Nguyễn Nhật Ánh",
      rating: 4.7,
      description:
        "Tác phẩm được viết về cuộc sống của những đứa trẻ ở một làng quê nghèo. Với những câu chuyện nhỏ đầy cảm xúc, tác giả đã khắc họa một bức tranh đẹp về tình cảm gia đình, tình bạn và tình yêu.",
      image:
        "https://www.nxbtre.com.vn/Images/Book/NXBTreStoryFull_02482010_104821.jpg",
    },
    {
      id: "nna3",
      title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
      author: "Nguyễn Nhật Ánh",
      rating: 4.6,
      description:
        "Cuốn sách là những câu chuyện nhỏ về tuổi thơ, về tình bạn, về những kỷ niệm đẹp đẽ và đáng nhớ của một thời.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8za0OxzSBEVcMbIr-2fU0b7zYNXz7l4sFjg&s",
    },
  ],
  a2: [
    // Đặng Lê Nguyên Vũ
    {
      id: "dlnv1",
      title: "Khởi Nghiệp Bằng Cà Phê",
      author: "Đặng Lê Nguyên Vũ",
      rating: 4.5,
      description:
        "Cuốn sách chia sẻ về hành trình khởi nghiệp và xây dựng đế chế cà phê Trung Nguyên của doanh nhân Đặng Lê Nguyên Vũ.",
      image:
        "https://tiki.vn/blog/wp-content/uploads/2024/09/review-khoi-nghiep-kinh-doanh-ca-phe-1.png",
    },
    {
      id: "dlnv2",
      title: "Nghĩ Giàu Làm Giàu Kiểu Việt Nam",
      author: "Đặng Lê Nguyên Vũ",
      rating: 4.4,
      description:
        "Cuốn sách chia sẻ những bí quyết thành công và làm giàu phù hợp với bối cảnh Việt Nam.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQesC_OINibdeygzk2epCUADSKSMwZvLAlQFgqKBRkwaxifaenkR6T9gTfgcTT5g9Y_lXo&usqp=CAU",
    },
  ],
  a3: [
    // Tô Hoài
    {
      id: "th1",
      title: "Dế Mèn Phiêu Lưu Ký",
      author: "Tô Hoài",
      rating: 4.9,
      description:
        "Tác phẩm nổi tiếng nhất của Tô Hoài, kể về cuộc phiêu lưu của chú Dế Mèn và những bài học quý giá về cuộc sống.",
      image:
        "https://bavi.edu.vn/upload/21768/fck/files/150800018_3868030666550251_8375198552020103317_n.jpg",
    },
    {
      id: "th2",
      title: "Truyện Tây Bắc",
      author: "Tô Hoài",
      rating: 4.7,
      description:
        "Tập truyện viết về cuộc sống, phong tục tập quán của đồng bào các dân tộc vùng Tây Bắc Việt Nam.",
      image:
        "https://product.hstatic.net/200000343865/product/truyen-tay-bac_bia1-4_fa1a75363ffb40529b0e3672341836a2_master.jpg",
    },
  ],
  a4: [
    // Nam Cao
    {
      id: "nc1",
      title: "Chí Phèo",
      author: "Nam Cao",
      rating: 4.8,
      description:
        "Tác phẩm nổi tiếng của Nam Cao, phản ánh số phận bi thảm của người nông dân trong xã hội phong kiến.",
      image:
        "https://product.hstatic.net/200000017360/product/chi-pheo_72e3f1370e484cf49b0fc94ee4ce0f80_master.jpg",
    },
    {
      id: "nc2",
      title: "Lão Hạc",
      author: "Nam Cao",
      rating: 4.7,
      description:
        "Truyện ngắn nổi tiếng của Nam Cao, kể về cuộc sống khốn khổ của lão Hạc, một người nông dân nghèo.",
      image:
        "https://bizweb.dktcdn.net/100/370/339/products/z4529778288710-9a538b8bcac451561af81cd240d963a1.jpg?v=1689758099500",
    },
  ],
  a5: [
    // Vũ Trọng Phụng
    {
      id: "vtp1",
      title: "Số Đỏ",
      author: "Vũ Trọng Phụng",
      rating: 4.8,
      description:
        "Tiểu thuyết phê phán xã hội, châm biếm sâu sắc về xã hội Việt Nam thời Pháp thuộc.",
      image: "https://ntthnue.edu.vn/uploads/Images/2013/10/198.jpg",
    },
    {
      id: "vtp2",
      title: "Giông Tố",
      author: "Vũ Trọng Phụng",
      rating: 4.6,
      description:
        "Tiểu thuyết phản ánh cuộc sống của người dân lao động trong xã hội thực dân nửa phong kiến.",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630482102i/13548424.jpg",
    },
  ],
};

export const getAuthorById = async (id) => {
  console.log("getAuthorById called with id:", id);

  // Lấy danh sách tác giả
  const authors = await getAuthors();
  console.log("Authors fetched:", authors.length);

  // Tìm tác giả theo ID
  const author = authors.find((author) => author.id === id);
  console.log("Author found:", author ? "yes" : "no");

  if (!author) {
    console.log("Author not found, returning default");
    // Nếu không tìm thấy, trả về thông tin mặc định
    return {
      id: id,
      name: "Tác giả không xác định",
      image: null,
      bookCount: 0,
      biography: "Không có thông tin.",
      books: [],
    };
  }

  // Lấy danh sách sách của tác giả
  const books = authorBooks[id] || [];
  console.log("Books for author:", books.length);

  // Trả về thông tin đầy đủ của tác giả
  return {
    ...author,
    books: books,
  };
};

export const getDiscoveryCards = () =>
  mockDelay([
    {
      id: "d1",
      title: "Cọng rơm hy vọng - đứng dậy sau vấp ngã",
      description:
        'Từ mất niềm tin vì liên tiếp thất bại, làm ăn thua lỗ, nhân vật Seong Gon quyết thay đổi để vực dậy bản thân, trong "Cọng rơm hy vọng".',
      image:
        "https://vcdn1-giaitri.vnecdn.net/2025/02/21/bia-sach-cong-rom-hy-vong-anh-5607-5549-1740112224.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=rOnJdldBV8bjFUtEIVNTRQ",
    },
    {
      id: "d2",
      title:
        "Sức mạnh của thói quen - Thay đổi cuộc sống từ những điều nhỏ nhất",
      description:
        'Cuốn sách "Sức mạnh của thói quen" của Charles Duhigg giúp bạn hiểu cách thói quen hoạt động và làm thế nào để thay đổi chúng, từ đó cải thiện cuộc sống cá nhân và công việc.',
      image:
        "https://bizweb.dktcdn.net/thumb/1024x1024/100/197/269/products/z4105964911654-5e5a35259898ca70607286170319aa65.jpg?v=1676275362800",
    },
    {
      id: "d3",
      title: "Tư duy nhanh và chậm - Khám phá bí ẩn của tâm trí",
      description:
        "Daniel Kahneman, nhà tâm lý học đoạt giải Nobel Kinh tế, giải thích hai hệ thống tư duy ảnh hưởng đến quyết định của chúng ta và cách nhận biết những sai lầm trong suy nghĩ.",
      image:
        "https://cdn1.fahasa.com/media/catalog/product/8/9/8935251417524_1.jpg",
    },
    {
      id: "d4",
      title:
        "Sapiens: Lược sử loài người - Hành trình từ quá khứ đến tương lai",
      description:
        "Yuval Noah Harari kể câu chuyện về sự tiến hóa của loài người, từ việc săn bắn hái lượm đến xây dựng đế chế và cách mạng công nghệ, đồng thời đặt ra những câu hỏi về tương lai của nhân loại.",
      image: "https://library.hust.edu.vn/sites/default/files/Sapiens_0.jpg",
    },
    {
      id: "d5",
      title: "Người giàu có nhất thành Babylon - Bí quyết tài chính cổ xưa",
      description:
        "George S. Clason chia sẻ những bí quyết tài chính từ thành Babylon cổ đại, giúp bạn hiểu cách quản lý tiền bạc, tích lũy tài sản và đạt được tự do tài chính.",
      image:
        "https://product.hstatic.net/200000845405/product/p97362m8935246937525_1_1da106c981c24a4d9571e8fc9eb88e3a_grande.jpg",
    },
    {
      id: "d6",
      title: "Đắc nhân tâm - Nghệ thuật thu phục lòng người",
      description:
        "Dale Carnegie đưa ra những nguyên tắc cơ bản về cách giao tiếp, xây dựng mối quan hệ và tạo ảnh hưởng tích cực đến người khác, giúp bạn thành công trong công việc và cuộc sống.",
      image:
        "https://tokhaiyte.vn/wp-content/uploads/2024/10/dac-nhan-tam-nghe-thuat-ung-xu-va-thu-phuc-long-nguoi-pdf.jpg",
    },
    {
      id: "d7",
      title: "Điểm đến của cuộc đời - Hành trình khám phá bản thân",
      description:
        "Cuốn sách giúp bạn nhận ra mục đích sống, vượt qua khó khăn và tìm thấy ý nghĩa trong cuộc sống thông qua những câu chuyện truyền cảm hứng và bài học thực tế.",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1631232023i/38221686.jpg",
    },
    {
      id: "d8",
      title: "Khởi nghiệp tinh gọn - Cách xây dựng doanh nghiệp thành công",
      description:
        "Eric Ries giới thiệu phương pháp khởi nghiệp tinh gọn, giúp các doanh nhân xây dựng sản phẩm, đo lường kết quả và học hỏi từ khách hàng một cách hiệu quả nhất.",
      image: "https://anzgroup.vn/upload/news/khoi-nghiep-tinh-gon-4690.jpg",
    },
    {
      id: "d9",
      title:
        "Nghệ thuật tinh tế của việc đếch quan tâm - Sống theo cách của bạn",
      description:
        "Mark Manson chỉ ra rằng chìa khóa để có cuộc sống tốt đẹp hơn không phải là luôn tích cực mà là học cách chấp nhận giới hạn của bản thân và tập trung vào những điều thực sự quan trọng.",
      image:
        "https://product.hstatic.net/200000017360/product/bia_nghe_thuat_tinh_te_cua_viec_dech_quan_tam_b1_c8072f2fb8b24420a6156dd64ae8c841_master.jpg",
    },
    {
      id: "d10",
      title:
        "Thiên tài bên trái, kẻ điên bên phải - Ranh giới mong manh của thiên tài và điên rồ",
      description:
        "Cao Minh kể những câu chuyện về những người có tư duy khác biệt, từ thiên tài đến kẻ điên, và làm thế nào họ thay đổi thế giới bằng cách nhìn nhận vấn đề từ góc độ khác.",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630313960i/50908574.jpg",
    },
  ]);
