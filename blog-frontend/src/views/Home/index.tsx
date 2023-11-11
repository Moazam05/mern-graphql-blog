import { Box, Typography } from "@mui/material";
import { homePageStyles } from "./components/HomeStyles";

function Home() {
  return (
    <>
      <Box sx={homePageStyles.container}>
        <Box sx={homePageStyles.wrapper}>
          <Typography sx={homePageStyles.text}>
            Write and Share Your Blog With Millions of People
          </Typography>
          <img
            width="50%"
            height="50%"
            //@ts-ignore
            style={homePageStyles.image}
            src="/blog.jpg"
            alt="Blog"
          />
        </Box>
        <Box sx={homePageStyles.wrapper}>
          <img
            width="50%"
            height="50%"
            //@ts-ignore
            style={homePageStyles.image}
            src="/publish.jpg"
            alt="Publish"
          />
          <Typography sx={homePageStyles.text}>
            Write and Share Your Blog With Millions of People
          </Typography>
        </Box>

        <Box sx={homePageStyles.wrapper}>
          <Typography sx={homePageStyles.text}>
            Write and Share Your Blog With Millions of People
          </Typography>
          <img
            width="50%"
            height="50%"
            //@ts-ignore
            style={homePageStyles.image}
            src="/article.jpg"
            alt="Article"
          />
        </Box>
      </Box>
    </>
  );
}
export default Home;
