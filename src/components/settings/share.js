import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip, Box } from '@/components/ui/card';
import { Share, Facebook, Mail, Send, Link, Twitter } from 'lucide-react';

const ShareMenu = ({ abstract }) => {
  const [anchorEl, useState] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getShareUrl = () => {
    return window.location.href;
  };

  const getShareText = () => {
    return `Check out this abstract: ${abstract.title}`;
  };

  const handleShare = (platform) => {
    const shareUrl = getShareUrl();
    const shareText = getShareText();
    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(abstract.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        handleClose();
        return;
      default:
        return;
    }

    window.open(shareLink, '_blank');
    handleClose();
  };

  return (
    <Box className="absolute top-2 right-2">
      <Tooltip title="Share">
        <IconButton
          onClick={handleClick}
          className="hover:bg-gray-100"
          size="small"
        >
          <Share className="h-5 w-5" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="mt-2"
      >
        <MenuItem onClick={() => handleShare('facebook')} className="gap-2">
          <Facebook className="h-4 w-4" />
          Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')} className="gap-2">
          <Twitter className="h-4 w-4" />
          Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShare('email')} className="gap-2">
          <Mail className="h-4 w-4" />
          Email
        </MenuItem>
        <MenuItem onClick={() => handleShare('whatsapp')} className="gap-2">
          <Send className="h-4 w-4" />
          WhatsApp
        </MenuItem>
        <MenuItem onClick={() => handleShare('copy')} className="gap-2">
          <Link className="h-4 w-4" />
          Copy Link
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ShareMenu;