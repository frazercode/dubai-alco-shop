import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import { deleteCategory, getCategories, patchCategory, postCategory } from "../api/category";


export default function CategorySection() {
    const fileRef = useRef();
    const [dialog, setDialog] = useState(false);
    const [image, setImage] = useState(undefined);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [_id, set_id] = useState('');

    const loadCategories = async () => {
        let res = await getCategories();
        setCategories(res);
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const handleChangeImage = () => {
        setImage(fileRef.current.files[0])
    }
    const handleCloseDialog = () => {
        setImage(undefined);
        setDialog(false);
        setName('');
        set_id('');
    }

    const handleAddOrEditCategory = async () => {
        const formData = new FormData();
        formData.append('_id', _id);
        formData.append('name', name);
        formData.append('image', image);
        let res;
        if (_id) res = await patchCategory(formData);
        else res = await postCategory(formData);
        if (res.message) return alert(res.message);
        handleCloseDialog();
        loadCategories();
        set_id('');
    }
    
    const handleDeleteCategory = async (_id) => {
        if (!window.confirm('Are you sure you want to delete the following category?')) return;
        let res = await deleteCategory(_id);
        if (res.message) return alert(res.message);
        loadCategories();
    }

    return (
        <TableContainer>
            <Dialog
                open={dialog}
                keepMounted={false}
                onClose={handleCloseDialog}
            >
                <DialogTitle>{_id ? 'Edit' : 'Add'} category</DialogTitle>
                <DialogContent sx={{width: 400}}>
                    <TextField
                        label="Name"
                        variant="standard"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{mb: 2}}
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
                    <Button onClick={handleAddOrEditCategory}>
                        {_id ? 'Edit' : 'Add'} category
                    </Button>
                </DialogActions>
            </Dialog>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell width={150}>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell width={20}>
                            <IconButton onClick={() => setDialog(true)}>
                                <AddBoxIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    
                </TableHead>
                <TableBody>
                    {Array.isArray(categories) ? categories.map((category => {
                        return (
                            <TableRow hover key={category._id}>
                                <TableCell width={150}>
                                    <img 
                                        style={{height: 100}}
                                        src={`${window.location.origin.replace(':3000','')}/images/${category.image}`}
                                    />
                                </TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell width={20}>
                                    <IconButton onClick={() => {
                                        set_id(category._id);
                                        setName(category.name);
                                        setDialog(true);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteCategory(category._id)}>
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