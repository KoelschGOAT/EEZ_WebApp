import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { z } from 'zod';
import enercon_logo from '../../Images/enercon_logo.png';
import { getVideoValidator } from '../../services/RequestVideos';
interface Video {
  id: number;
  video: string;
  screenshot: string;
  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
}
interface Props {
  setClientVideos: (video: Video) => Video;
  clientVideos: Video[];
  allVideos: Video[];
}
export default function CheckboxListSecondary({
  setClientVideos,
  clientVideos,
  allVideos,
}: Props) {
  const handleToggle = (value: Video) => () => {
    const currentIndex = clientVideos.indexOf(value);
    const newChecked = [...clientVideos];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setClientVideos(newChecked);
  };

  return (
    <List
      dense
      sx={{
        width: '100%',
        bgcolor: 'inherit',
      }}
    >
      {allVideos.map((video: Video) => {
        const labelId = `checkbox-list-secondary-label-${video}`;
        return (
          <ListItem
            key={video.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(video)}
                checked={
                  clientVideos.findIndex(
                    (check: any) => check.id === video.id
                  ) !== -1
                }
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={'Avatar'} src={enercon_logo} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line `} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
