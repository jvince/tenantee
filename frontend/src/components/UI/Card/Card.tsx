import { Button, Card as CardBase, CardBody, CardFooter, CardHeader, Flex, Heading, HeadingProps, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IconDotsVertical } from '@tabler/icons';
import React, { ReactNode, useCallback, useMemo } from 'react';

type ActionType = 'click' | 'edit' | 'delete';
type ActionEventType = `on${Capitalize<ActionType>}`;

interface CardActionEventHandler<Type> {
    (arg: Type): void;
}

type CardActionEvent<Type> = {
    [Property in ActionEventType]?: CardActionEventHandler<Type>;
}

export interface CardIconProps<Type> {
    model: Type
}

export interface CardProps<Type = unknown> extends CardActionEvent<Type> {
    children?: ReactNode;
    icon?: ReactNode | ((props: CardIconProps<Type>) => JSX.Element);
    model: Type;
    title: string;
    titleProps?: HeadingProps
}

function Card<Type>({
    children,
    icon,
    model,
    title,
    titleProps = { size: 'sm' },
    onClick,
    onDelete,
    onEdit
}: CardProps<Type>) {
    const hasActions = Boolean(onEdit || onDelete);

    const iconEl = useMemo(() => (
        icon instanceof Function
            ? React.createElement(icon, { model })
            : icon
    ), [icon, model]);

    const handleEvent = useCallback((handler: CardActionEventHandler<Type> | undefined) => () => {
        handler?.(model);
    }, [model]);

    return (
        <CardBase>
            <CardHeader>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                >
                    <Flex
                        alignItems="flex-end"
                        gap={2}
                    >
                        {icon && (
                            <Flex>
                                {iconEl}
                            </Flex>
                        )}
                        <Flex>
                            <Heading {...titleProps}>
                                {title}
                            </Heading>
                        </Flex>
                    </Flex>

                    {hasActions && (
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={(
                                    <IconDotsVertical />
                                )}
                                variant="ghost"
                            />
                            <MenuList>
                                {onEdit && (
                                    <MenuItem
                                        onClick={handleEvent(onEdit)}
                                    >
                                        Edit
                                    </MenuItem>
                                )}
                                {onDelete && (
                                    <MenuItem
                                        color="red"
                                        onClick={handleEvent(onDelete)}
                                    >
                                        Delete
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>
                    )}
                </Flex>
            </CardHeader>

            <CardBody>
                {children}
            </CardBody>

            {onClick && (
                <CardFooter>
                    <Flex
                        alignItems="center"
                        direction="column"
                        grow={1}
                    >
                        <Button
                            colorScheme="blue"
                            onClick={handleEvent(onClick)}
                        >
                            View
                        </Button>
                    </Flex>
                </CardFooter>
            )}
        </CardBase>
    );
}

export default Card;