import React, { useState, useEffect, useMemo } from "react";
import { bookData } from "./data/book";
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useMemo(() => {
    let options = [];
    bookData.forEach((book) => {
      book.categories.forEach((category) => {
        if (!options.includes(category)) {
          options.push(category);
        }
      });
    });
    return options;
  }, []);
  useEffect(() => {
    /* instruction: load books from the books data */
    setBooks(bookData);
  }, []);
  useEffect(() => {
    if (selectedCategory === "") {
      setBooks(bookData);
    } else {
      const filteredBooks = bookData.filter((book) =>
        book.categories.includes(selectedCategory)
      );
      setBooks(filteredBooks);
    }
  }, [selectedCategory]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {/* instruction: list books using .map() */}
        {books.map((book) => (
          <div className="col-4 my-5" key={book.title}>
            <div className="card">
              <img
                src="../images/book.jpg"
                alt={book.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p className="card-text">Author: {book.author}</p>
                <span>
                  Category:
                  {book.categories.length > 0 &&
                    `${book.categories.join(", ")}`}
                </span>
                <p className="card-text">Year: {book.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BookList;
