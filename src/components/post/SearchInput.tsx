import type { PostType } from '@/types/post-type';
import { Input } from 'antd';

interface SearchInputProps {
    posts: PostType[];
    setFilteredPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ posts, setFilteredPosts }) => {
    const handleSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const filtered = posts.filter((post) => {
            return post.title.toLowerCase().includes(value.toLowerCase());
        });

        setFilteredPosts(filtered);
    };

    return (
        <Input
            onChange={handleSearchTitle}
            placeholder="Search post title"
            size="large"
        />
    );
};

export default SearchInput;