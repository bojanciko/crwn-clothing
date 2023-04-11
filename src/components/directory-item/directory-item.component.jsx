import React from 'react'
import { BackgroundImage, Body, DirectoryItemConatiner} from './directory-item.styles.jsx';
import { useNavigate } from 'react-router-dom';


const DirecrtoryItem = ({category}) => {
  const {imageUrl, title, route} = category
  const navigate = useNavigate()

  const navigateHandler = () => navigate(route)

  return (
    <DirectoryItemConatiner onClick={navigateHandler}>
          <BackgroundImage imageUrl={imageUrl}/>
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemConatiner>
  )
}

export default DirecrtoryItem