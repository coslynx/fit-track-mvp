import { useState } from 'react';
import { useStore } from '@/store';
import Button from './Button';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

interface SocialShareButtonProps {
  title: string;
  url: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ title, url }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (platform: string) => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
    }, 1000);
    // Implement actual social sharing logic using libraries like ShareThis or AddThis
  };

  return (
    <div className="flex gap-2">
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleShare('facebook')}
        disabled={isSharing}
      >
        <FaFacebook className="mr-2" />
        Share on Facebook
      </Button>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleShare('twitter')}
        disabled={isSharing}
      >
        <FaTwitter className="mr-2" />
        Share on Twitter
      </Button>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleShare('instagram')}
        disabled={isSharing}
      >
        <FaInstagram className="mr-2" />
        Share on Instagram
      </Button>
    </div>
  );
};

export default SocialShareButton;