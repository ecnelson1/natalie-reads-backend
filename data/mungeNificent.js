function formatBook(books){
  const finalBook = books.body.items.map(book => {
    
    return {
      id: book.id, 
      img: book.volumeInfo.imageLinks || 'Image Unavailable', 
      title: book.volumeInfo.title || 'Title Unavailable', 
      summary: book.volumeInfo.description || 'Summary Unavailable', 
      authors: book.volumeInfo.authors || 'Author(s)Unavailable', 
      published: book.volumeInfo.publishedDate || 'Published Date Unavailable', 
      pages: book.volumeInfo.pageCount || 'Pages Unavailable', 
    };
  });
    
  return finalBook;
}

module.exports = { formatBook };

