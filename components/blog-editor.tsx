"use client";

import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import React from 'react'

type Props = {
    value: string;
    onChange: (value: string) => void;
};

interface Theme {
    colorScheme: 'dark' | 'light';
    colors: {
        [key: string]: string[];
    };
}

function BlogEditor({ value, onChange }: Props) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div
            className="dark:bg-neutral-800 bg-neutral-100 shadow-xl dark:shadow-none mt-6 py-4 px-5 font-normal rounded-xl text-base dark:text-neutral-200 text-neutral-700 text-center md:text-left max-w-2xl md:max-w-3xl lg:max-w-6xl"
            style={{ position: 'relative' }}
        >
            <RichTextEditor
                editor={editor}
                withCodeHighlightStyles
                withTypographyStyles
                classNames={{
                    root: 'dark:border-none',
                    content: 'bg-neutral-300 dark:bg-neutral-700',
                    toolbar: 'dark:text-neutral-100 text-neutral-800 dark:bg-neutral-800 bg-neutral-400 dark:border-none',
                    controlsGroup: 'toolbar-button',
                }}
                styles={{
                    controlsGroup: (theme: Theme) => ({
                        button: {
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            '&:hover': {
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                            },
                            '&[data-active]': {
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[7] : theme.colors.blue[2],
                            },
                        },
                    }),
                }}
            >
                <RichTextEditor.Toolbar sticky={true} stickyOffset={0}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content
                    classNames={{
                        "root": "bg-neutral-300 dark:bg-neutral-800"
                    }}
                />
            </RichTextEditor>
        </div>
    )
}

export default BlogEditor;