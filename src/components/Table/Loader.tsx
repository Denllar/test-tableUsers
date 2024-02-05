import ContentLoader from "react-content-loader"

const Loader = () => (
  <ContentLoader 
    speed={2}
    width={40}
    height={20}
    viewBox="0 0 40 20"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="4" rx="0" ry="0" width="53" height="3" /> 
    <rect x="5" y="9" rx="0" ry="0" width="35" height="2" /> 
    <rect x="0" y="0" rx="6" ry="6" width="92" height="36" />
  </ContentLoader>
)

export default Loader