const Bill = require('../models/bill.model.js');

const getBills = async (req, res) => {
	try {
		const bills = await Bill.find();
		res.json(bills);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const createBill = async (req, res) => {
	const {
		date,
		price,
		formPay,
		supplier,
		receiptNum,
		receiptType,
		status,
		comments,
	} = req.body;
	try {
		const newBill = new Bill({
			date,
			price,
			formPay,
			supplier,
			receiptNum,
			receiptType,
			status,
			comments,
		});
		const savedBill = await newBill.save();
		res.json(savedBill);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getBill = async (req, res) => {
	try {
		const bill = await Bill.findById(req.params.id);
		res.json(bill);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateBill = async (req, res) => {
	try {
		const {
			date,
			price,
			formPay,
			supplier,
			receiptNum,
			receiptType,
			status,
			comments,
		} = req.body;
		const updateBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(updateBill);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteBill = async (req, res) => {
	try {
		const deletedBill = await Bill.findByIdAndDelete(req.params.id);
		res.json(deletedBill);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getBill,
	getBills,
	createBill,
	updateBill,
	deleteBill,
};
