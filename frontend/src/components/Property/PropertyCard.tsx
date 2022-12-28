import { Flex, Stack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { IconHome } from '@tabler/icons';
import { Property } from '../../types/property';
import { Card, CardProps } from '../UI/Card';

function PropertyCard(props: CardProps<Property>) {
    console.log(props);

    return (
        <Card
            {...props}
            icon={(
                <IconHome />
            )}
        >
            <Stack>
                <Flex>
                    <Stat>
                        <StatLabel>
                            Location
                        </StatLabel>
                        <StatNumber>
                            {props.model.location}
                        </StatNumber>
                    </Stat>
                    {props.model.tenants && (
                        <Stat>
                            <StatLabel>
                                Tenants
                            </StatLabel>
                            <StatNumber>
                                {props.model.tenants.length}
                            </StatNumber>
                        </Stat>
                    )}
                </Flex>
            </Stack>

        </Card>
    );

}

export default PropertyCard;
