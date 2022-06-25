import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxList({ pcVideos,setPcVideos, allVideos,regestration }) {
  
  const handleToggle = (value) => () => {
    
    const currentIndex=pcVideos.findIndex((check) => check.id === value.id);
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
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          padding: "0",
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
                      pcVideos.findIndex((check) => check.id === video.id) !==
                      -1
                    }
                    tabIndex={-1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${video.title_de}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
