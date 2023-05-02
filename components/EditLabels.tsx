import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { DisplayLabelIcon } from "./LabelCard";
import { actionButtonStyles } from "./TailwindStyles";

export const EditLabels = ({
	questionLabels,
	unselectedLabels,
	setQuestionLabels,
	setUnselectedLabels
}: {
	questionLabels: LabelsModel[];
	unselectedLabels: LabelsModel[];
	setQuestionLabels: any,
	setUnselectedLabels: any
}) => {
	const [addLabel, setAddLabel] = useState(false);

	const sortSublabels = (sublabels: SublabelModel[]) => {
		sublabels.sort(
			(a: SublabelModel, b: SublabelModel) =>
				parseInt(a.slid) - parseInt(b.slid)
		);
	};

	const sortLabels = (labels: LabelsModel[]) => {
		labels.sort(
			(a: LabelsModel, b: LabelsModel) =>
				parseInt(a.lid) - parseInt(b.lid)
		);
		labels.forEach((label: LabelsModel) => {
			sortSublabels(label.sublabels);
		});
	};

	function handleSelectLabel(
		selectedLabel: LabelsModel,
		selectedSublabel: SublabelModel
	) {
		let updatedLabels: LabelsModel[] = [];
		let add_selected = true;
		let add_unselected = true;

		questionLabels.forEach((label: LabelsModel) => {
			let updatedSublabels: SublabelModel[] = [];

			label.sublabels.forEach((sublabel: SublabelModel) => {
				if (sublabel.sublabel == selectedSublabel.sublabel) {
					add_selected = false;

					// remove this label from the selected labels and add it back to unselected labels
					unselectedLabels.forEach((unselectedLabel: LabelsModel) => {
						if (unselectedLabel.label == selectedLabel.label) {
							unselectedLabel.sublabels.push(selectedSublabel);

							sortSublabels(unselectedLabel.sublabels);
							add_unselected = false;
						}
					});
					if (add_unselected) {
						unselectedLabels.push({
							...selectedLabel,
							sublabels: [selectedSublabel],
						});
						add_unselected = false;
					}
				} else {
					updatedSublabels.push(sublabel);
				}
			});

			if (label.label == selectedLabel.label && add_selected) {
				updatedSublabels.push(selectedSublabel);
				add_selected = false;
			}
			if (updatedSublabels.length > 0) {
				updatedLabels.push({
					...label,
					sublabels: updatedSublabels,
				});
			}
		});

		if (add_selected) {
			updatedLabels.push({
				...selectedLabel,
				sublabels: [selectedSublabel],
			});
			add_selected = false;
		}
		if (add_unselected) {
			let newUnselectedLabels: LabelsModel[] = [];
			unselectedLabels.forEach((label: LabelsModel) => {
				const newUnselectedSublabels = label.sublabels.filter(
					(sublabel: SublabelModel) =>
						sublabel.sublabel != selectedSublabel.sublabel
				);
				if (newUnselectedSublabels.length > 0) {
					newUnselectedLabels.push({
						...label,
						sublabels: newUnselectedSublabels,
					});
				}
			});
			sortLabels(newUnselectedLabels);
			setUnselectedLabels(newUnselectedLabels);
		}

		sortLabels(updatedLabels);
		setQuestionLabels(updatedLabels);
		setAddLabel(false);
	}

	return (
		<>
            <button
                type='button'
                className={`${actionButtonStyles} h-10 flex items-center justify-center space-x-1`}
                onClick={() => setAddLabel(!addLabel)}
            >
                <FaPlus size={10} />
                <p>Label</p>
            </button>

            <div className="flex flex-row w-full flex-wrap">
                {questionLabels.map((label: LabelsModel) =>
                    label.sublabels.map((sublabel: SublabelModel) => (
                        <button
                            key={`select-${label.label}-${sublabel.sublabel}`}
                            onClick={() => handleSelectLabel(label, sublabel)}
                        >
                            <DisplayLabelIcon sublabel={sublabel.sublabel} />
                        </button>
                    ))
                )}
            </div>

			<div
				className={`border-t border-b pb-3 mb-32 pt-3 mt-3 ${
					addLabel ? '' : 'hidden'
				}`}
			>
				{unselectedLabels.map((label: LabelsModel) =>
					label.sublabels.map((sublabel: SublabelModel) => (
						<button
							key={`select-${label.label}-${sublabel.sublabel}`}
							onClick={() => handleSelectLabel(label, sublabel)}
						>
							<DisplayLabelIcon sublabel={sublabel.sublabel} />
						</button>
					))
				)}
			</div>
		</>
	);
};
