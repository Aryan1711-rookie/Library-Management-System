const catalogResouce = [
  {
    id: "1",
    title: "संस्कृत व्याकरण",
    author: "डॉ. रवि प्रभात",
    type: "books",
    category: "Sanskrit",
    language: "Hindi",
    available: true,
    coverUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400",
    fileUrl:
      "https://res.cloudinary.com/dcw7sozkr/image/upload/v1745419963/4_07-08-2021_13-09-31_Sanskrit_Vyakaran-_sem-1_FINAL_cijv9e.pdf",
  },
  {
    id: "2",
    title: "Wavelet-based Banknote Authentication",
    author: "Julian Knaup",
    type: "research",
    category: "Computer Science",
    language: "English",
    available: true,
    coverUrl:
      "https://images.unsplash.com/photo-1565292793248-f5c13612c48e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fileUrl: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1745418889/Hidden_in_Plain_Sight_Adversarial_Attack_on_Wavelet-Based_Banknote_Authentication_zx5j8o.pdf",
  },
  {
    id: "3",
    title: "Ancient Indian Mathematics",
    author: "Prof.K.Ramasubramanian",
    type: "videos",
    category: "Mathematics",
    language: "Hindi",
    available: true,
    coverUrl:
      "https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5jaWVudCUyMGluZGlhbiUyMG1hdGhlbWF0aWNzfGVufDB8fDB8fHww",
    fileUrl: "https://www.youtube.com/playlist?list=PLbMVogVj5nJThf31TNSQzuN7zqxe7HdRN",
  },
  {
    id: "4",
    title: "Artificial Intelligence and Machine Learning",
    author: "Kushal Singh",
    type: "magazines",
    category: "Computer Science",
    language: "English",
    available: true,
    coverUrl:
      "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fileUrl: "https://res.cloudinary.com/dcw7sozkr/image/upload/v1745421451/TEJAS_compressed_xzsk1j.pdf",
  },
];
export const getCatalog = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: catalogResouce,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCatalogById = (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = catalogResouce.find(
      (catalog) => catalog.id === resourceId
    );
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }
    res.status(200).json({
        success: true,
        data: resource
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching book",
    });
  }
};
