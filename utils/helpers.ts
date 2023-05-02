export const createLabelDict = (labels: LabelsModel[]) => {
    let label_strings: Record<string, string[]> = {}
    labels.forEach((label: LabelsModel) => {
        label_strings[label.label] = []
        label.sublabels.forEach((sublabel: SublabelModel) => {
            label_strings[label.label].push(sublabel.sublabel)
        })
    })
    return label_strings
}

export const getSublabelStringsFromLabelsDict = (labelsDict: Record<string, string[]>) => {
    const total_sublabel_strings: {label: string, sublabel: string}[] = []
    Object.entries(labelsDict).forEach(([label_string, sublabel_strings]: [string, string[]]) =>
        sublabel_strings.forEach((sublabel: string) => 
            total_sublabel_strings.push({label: label_string, sublabel: sublabel})
        )
    )
    return total_sublabel_strings    
}

