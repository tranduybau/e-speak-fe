export default function devLog(...data: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...data) // eslint-disable-line no-console
  }
}
