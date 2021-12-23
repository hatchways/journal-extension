export interface Contact {
	name?: string;
	email?: string;
	phone?: string;
	position?: string;
	notes?: string;
}

export interface JobEntry {
	id: number;
	companyName: string;
	role: string;
	status: string;
	location?: string;
	appliedOn: Date;
	notes: string;
	contacts?: Contact[];
	details?;
	followUpDate?: Date;
}
