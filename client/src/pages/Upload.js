const Upload = () => {
  return (
    <main>
      <h1>Upload image to server</h1>
      <form action="upload" enctype="multipart/form-data" method="post">
        <input aria-label="title" type="text" name="title" />
        <input aria-label="category" type="text" name="category" />
        <input aria-label="files" type="file" name="multipleFiles" multiple="multiple" />
        <input type="submit" value="Upload" />
      </form>
    </main>
  )
}

export default Upload;
