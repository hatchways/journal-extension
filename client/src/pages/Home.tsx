import { Box, Button, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../store";

import { logout } from "../store/thunks";

const Home = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);
  return (
    <Box>
      <Typography>Home</Typography>
      {userId ? (
        <>
          <Typography>Logged in {userId}</Typography>
          <Button variant="contained" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </>
      ) : (
        <Typography>Not logged in</Typography>
      )}
    </Box>
  );
};

export default Home;
