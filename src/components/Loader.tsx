import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export const Loader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox='0 0 400 160'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <rect
      x='10'
      y='11'
      rx='3'
      ry='3'
      width='88'
      height='6'
    />
    <rect
      x='12'
      y='98'
      rx='3'
      ry='3'
      width='410'
      height='6'
    />
    <rect
      x='7'
      y='146'
      rx='3'
      ry='3'
      width='418'
      height='7'
    />
    <rect
      x='9'
      y='28'
      rx='0'
      ry='0'
      width='436'
      height='41'
    />
    <rect
      x='20'
      y='122'
      rx='0'
      ry='0'
      width='355'
      height='5'
    />
  </ContentLoader>
)