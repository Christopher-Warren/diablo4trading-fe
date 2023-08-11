import { Game } from '@diablosnaps/common';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Root = styled(Stack)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'dashed',
    padding: theme.spacing(4),
}));
Root.defaultProps = {
    direction: 'column',
    spacing: 2,
    alignItems: 'center',
    justifyContent: 'center',
};

const Input = styled('input')(() => ({
    display: 'none',
}));

interface ListingNewImport {
    onImageImport: (image: string) => void;
    onItemImport: (image: string, item: Game.Item) => void;
}

export const ListingNewImport: React.FC<ListingNewImport> = ({
    onImageImport,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onItemImport: _,
}) => {
    const { i18n } = useLingui();

    const input = React.useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        input.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const image = reader.result as string;
                onImageImport(image);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Root>
            <Button onClick={handleUploadClick} variant='contained'>
                {t(i18n)`Upload Item Image`}
            </Button>
            <Input
                ref={input}
                accept='image/*'
                onChange={handleImageChange}
                type='file'
            />
            <Typography color='text.secondary'>
                {t(i18n)`or`}
            </Typography>
            <Button>
                {t(i18n)`Import Item from ${'DIABLOSNAPS'}`}
            </Button>
        </Root>
    );
};
