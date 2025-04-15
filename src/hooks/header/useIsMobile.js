import { useMediaQuery } from 'react-responsive'

const useIsMobile = () => {
  return useMediaQuery({ maxWidth: 639 })
}

export default useIsMobile
