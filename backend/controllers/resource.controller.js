// controllers/resourceController.js

// Sample book data (would normally come from a database)
const books = [
  {
    id: 'book001',
    title: 'A BRIEF INTRODUCTION TO PARTICLE PHYSICS ',
    author: 'Nari Mistry',
    format: 'E-books',
    subject: 'Physics',
    semester: 'Fall 2024',
    thumbnail: 'https://res.cloudinary.com/dcw7sozkr/image/upload/v1745243974/physics-3871216_1280_s6ka41.jpg',
    fileUrl: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1745243788/Brief_Intro_to_HEP1_eesmns.pdf"
  },
  {
    id: 'book002',
    title: 'Operating System',
    author: 'A.SANDEEP',
    format: 'E-books',
    subject: 'Computer Science',
    semester: 'Spring 2025',
    thumbnail: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80',
    fileUrl: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1745244289/R20CSE2202-OPERATING-SYSTEMS_lgg1fb.pdf"
  },
  {
    id: 'book003',
    title: 'Introduction to Linear Algebra',
    author: 'Gilbert Strang',
    format: 'PDF',
    subject: 'Mathematics',
    semester: 'Summer 2025',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80',
    fileUrl: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1745227338/All_Lectures_11zon_11zon_hxyzr6.pdf"
  }
];

// Get all books
export const getBooks = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching books'
    });
  }
};

// Get single book by ID
export const getBookById = (req, res) => {
  try {
    const bookId = req.params.id;
    const book = books.find(b => b.id === bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching book'
    });
  }
};