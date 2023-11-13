import React from 'react';


import { Table, Input, Button} from '@chakra-ui/react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
  
  import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react';
  
  import { ChevronDownIcon } from '@chakra-ui/icons';

function AddExpense(){

    return <><Table>Expense Tracker</Table>
  <Input placeholder='Expense Name' />
  
  <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Category
  </MenuButton>
  <MenuList>
    <MenuItem>Food</MenuItem>
    <MenuItem>Housing</MenuItem>
    <MenuItem>Cloth</MenuItem>
    <MenuItem>HEalth</MenuItem>
    <MenuItem>Transportation</MenuItem>
    <MenuItem>Entertainment</MenuItem>
  </MenuList>
</Menu>

  <Input
 placeholder="Select Date and Time"
 size="md"
 type="date"
/>
<NumberInput defaultValue={0} precision={2} step={10} min={0}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
<Input placeholder='Memo' />
<Button colorScheme='blue'>Add Expense</Button>
  </>

}

export default AddExpense;