import React from 'react'
import { css } from '@emotion/react'
import LazyImage from './LazyImage'

interface ListItemProps {
  thumbnailUrl: string
  title: string
}

const ListItem: React.FC<ListItemProps> = ({ thumbnailUrl, title }) => {
  return (
    <li css={listItemStyle}>
      <LazyImage src={thumbnailUrl} alt="thumbnail image" />
      <span>{title}</span>
    </li>
  )
}

export default ListItem

const listItemStyle = css`
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  align-items: center;
  box-sizing: border-box;

  img {
    width: 75px;
    height: 75px;
  }

  span {
    flex: 1;
    padding-left: 10px;
  }
`
