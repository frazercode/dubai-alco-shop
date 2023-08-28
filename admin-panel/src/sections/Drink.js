import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import { deleteDrink, getDrinks, patchDrink, postDrink } from "../api/drink";
import Dropdown from "../components/dropdown";
import { getCategories } from "../api/category";

export default function DrinkSection() {
    const fileRef = useRef();
    const [dialog, setDialog] = useState(false);
    const [image, setImage] = useState(undefined);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [drinks, setDrinks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [_id, set_id] = useState('');

    const loadCategories = async () => {
        let res = await getCategories();
        setCategories(res);
    }

    const loadDrinks = async () => {
        let res = await getDrinks();
        setDrinks(res);
    }

    useEffect(() => {
        loadCategories();
        loadDrinks();
    }, []);

    const handleChangeImage = () => {
        setImage(fileRef.current.files[0])
    }
    const handleCloseDialog = () => {
        setImage(undefined);
        setDialog(false);
        setName('');
        setPrice('');
        setCategory('');
        set_id('');
    }

    const handleAddOrEditDrink = async () => {
        const formData = new FormData();
        if (!category) return alert('Please select a category first');
        formData.append('_id', _id);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);
        let res;
        if (_id) res = await patchDrink(formData);
        else res = await postDrink(formData);
        if (res.message) return alert(res.message);
        handleCloseDialog();
        loadDrinks();
        set_id('');
    }
    const handleDeleteDrink = async (_id) => {
        if (!window.confirm('Are you sure you want to delete the following drink?')) return;
        let res = await deleteDrink(_id);
        if (res.message) return alert(res.message);
        loadDrinks();
    }

    return (
        <TableContainer>
            <Dialog
                open={dialog}
                onClose={() => setDialog(false)}
            >
                <DialogTitle>{_id ? 'Edit' : 'Add'} drink</DialogTitle>
                <DialogContent sx={{width: 400}}>
                    <TextField
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        variant="standard"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <Dropdown
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        FormControlProps={{fullWidth: true, sx: {mb: 2}}}
                        items={Array.isArray(categories) ? categories.map(category => { return {name: category.name, value: category._id }}) : []}
                    />
                    {image ? 
                        <img
                            src={URL.createObjectURL(image)}
                            style={{height: 250, width:110, borderRadius: 8, objectFit:"cover"}}
                        /> 
                    : null}
                    <br />
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleChangeImage} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddOrEditDrink}>
                        {_id ? 'Edit' : 'Add'} drink
                    </Button>
                </DialogActions>
            </Dialog>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell width={150}>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell width={20}>
                            <IconButton onClick={() => setDialog(true)}>
                                <AddBoxIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(drinks) ? drinks.map((drink => {
                        return (
                            <TableRow hover key={drink._id}>
                                <TableCell width={150}>
                                    <img 
                                        style={{height: 100}}
                                        src={`${window.location.origin.replace(':3000','')}/images/${drink.image}`}
                                    />
                                </TableCell>
                                <TableCell>{drink.name}</TableCell>
                                <TableCell>{Array.isArray(categories) ? categories.find(e => e._id === drink.category)?.name : ''}</TableCell>
                                <TableCell>{drink.price}</TableCell>
                                <TableCell width={20}>
                                    <IconButton onClick={() => {
                                        set_id(drink._id);
                                        setName(drink.name);
                                        setPrice(drink.price);
                                        setCategory(drink.category);
                                        setDialog(true);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteDrink(drink._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })) : null}
                </TableBody>
            </Table>
        </TableContainer>
    )
}