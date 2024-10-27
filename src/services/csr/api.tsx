export async function SearchWord(searchTerm: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vocabularies/search?word=${searchTerm}`,
    )
    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}
