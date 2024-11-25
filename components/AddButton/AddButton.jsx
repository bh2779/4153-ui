import React from 'react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export default function AddButton() {
    return (
        <Link href="/review/form" passHref>
            <Button
                size="lg"
                radius="xl"
                variant="light"
                style={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                }}
            >
                <IconPlus size={24} />
            </Button>
        </Link>
    );
}
