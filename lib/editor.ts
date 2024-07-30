export function localSave(
  editorContent: string,
  title: string,
  category: string
) {
  localStorage.setItem(
    category,
    JSON.stringify({
      title,
      editorContent,
    })
  )
}

// export function
