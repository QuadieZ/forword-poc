import { Divider, Stack, Text } from "@chakra-ui/react";
import { ForwordBlogCard } from "./ForwordBlogCard";

export type BlogPreviewData = {
  title: string;
  description: string;
  image: string;
  slug: string;
  company: string;
};

export type ForwordBlogListProps = {
  blogs: BlogPreviewData[];
};

export const ForwordBlogList = (props: ForwordBlogListProps) => {
  const { blogs } = props;
  return (
    <Stack
      py={6}
      divider={<Divider borderColor="border.primary" />}
      gap={4}
      h="100%"
      overflow="scroll"
    >
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <ForwordBlogCard
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            slug={blog.slug}
            company={blog.company}
          />
        ))
      ) : (
        <Text>No Blogs here yet, check back later!</Text>
      )}
    </Stack>
  );
};
