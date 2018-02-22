import React from "react"

const AddBlog = ({ add, handler, title, author, url }) => (
  <form onSubmit={add}>
    <div>
      Title
      <input
        type="text"
        name="title"
        value={title}
        onChange={handler}
      />
    </div>
    <div>
      Author
      <input
        type="text"
        name="author"
        value={author}
        onChange={handler}
      />
    </div>
    <div>
      URL
      <input
        type="text"
        name="url"
        value={url}
        onChange={handler}
      />
    </div>
    <button type="submit">Add</button>
  </form>
)

export default AddBlog
