import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { z } from 'zod';
import { VideoValidator } from '../../pages/Admin/Table';
import { getVideoValidator } from '../../services/RequestVideos';
export const VideoType = z
  .object({
    id: z.string(),
    video: z.string(),
    screenshot: z.string(),
    published: z.string(),
    title_de: z.string(),
    title_en: z.string(),
    text_de: z.string(),
    text_en: z.string(),
  })
  .array();
export const tt = { VideoType } as const;
console.log(tt);
export type Props = {
  pcVideos: typeof VideoType;
  setPcVideos: () => void;
  allVideos: typeof VideoType;
  id: string;
};
export default function CheckboxList({
  pcVideos,
  setPcVideos,
  allVideos,
  id,
}: Props) {
  const handleToggle = (value: any) => () => {
    const currentIndex = pcVideos.findIndex(
      (check: any) => check.id === value.id
    );
    const newChecked = [...pcVideos];
    /* If Entry == -1, so doesnt exist, push to State, otherwise splice */
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setPcVideos(newChecked);
  };

  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          padding: '0',

          minWidth: '100%',
        }}
      >
        {allVideos.map((video) => {
          const labelId = `${video.id}`;

          return (
            <ListItem key={video.id} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(video)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    /* Check if Video Item is in PCVideos, true= checked, false= not checked */
                    checked={
                      pcVideos.findIndex(
                        (check) => check.id === video.id
                      ) !== -1
                    }
                    tabIndex={-1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${video.title_de}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
