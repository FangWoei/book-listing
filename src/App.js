import React, { useState, useEffect, useMemo } from "react";
import { bookData } from "./data/book";
const BookList = () => {
  // const [books, setBooks] = useState([]);
  const [books, setBooks] = useState(bookData);
  const [selectedCategory, setSelectedCategory] = useState("");

  // retrieve the category options from the bookdata
  const categories = useMemo(() => {
    let options = [];
    bookData.forEach((book) => {
      book.categories.forEach((category) => {
        // to make sure the category wasn't already in the options
        if (!options.includes(category)) {
          options.push(category);
        }
      });
    });
    return options;
  }, [bookData]);

  // const categories = useMemo(() => {
  //   let options = [];
  //   bookData.forEach((book) => {
  //     book.categories.forEach((category) => {
  //       if (!options.includes(category)) {
  //         options.push(category);
  //       }
  //     });
  //   });
  //   return options;
  // }, []);

  // useEffect(() => {
  //   /* instruction: load books from the books data */
  //   setBooks(bookData);
  // }, []);

  // useEffect(() => {
  //   if (selectedCategory === "") {
  //     setBooks(bookData);
  //   } else {
  //     const filteredBooks = bookData.filter((book) =>
  //       book.categories.includes(selectedCategory)
  //     );
  //     setBooks(filteredBooks);
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    let newBooks = [...bookData];
    /* Instruction: filter books by selectedCategory */
    /* Instruction: set books to all books if selectedCategory is empty */
    if (selectedCategory !== "") {
      newBooks = newBooks.filter((b) =>
        b.categories.includes(selectedCategory)
      );
    }
    /* Instruction: set filtered books to books state */
    setBooks(newBooks);
  }, [bookData, selectedCategory]);

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
          <div className="col-lg-4 col-md-6 col-sm-12 my-5" key={book.title}>
            <div className="card">
              <img
                src={"/images/" + book.image}
                alt={book.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p className="card-text">Author: {book.author}</p>
                <span>
                  {/* Category:
                  {book.categories.length > 0 &&
                    `${book.categories.join(", ")}`} */}
                  Categories: {book.categories.join(", ")}
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
