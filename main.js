const handleButtonClick = (type) => {
    fetch(`https://raw.githubusercontent.com/boz83/CW2/master/module-${type}.json`)
        .then(response => response.json())
        .then(data => {
            const moduleBody = document.getElementById('module-table-body')
            const moduleHead = document.getElementById('module-table-header')
            const headerRow = document.createElement('tr');
            if (!data.length) return;
            const keys = Object.keys(data[0]);
            keys.forEach(key => {
                const headerCell = document.createElement("td");
                headerCell.append(key);
                headerRow.append(headerCell);
            });
            while (moduleHead.firstChild) moduleHead.removeChild(moduleHead.firstChild);
            while (moduleBody.firstChild) moduleBody.removeChild(moduleBody.firstChild);

            moduleHead.append(headerRow);

            data.forEach(course => {
                const bodyRow = document.createElement('tr');
                const values = Object.values(course);
                values.forEach((value, index) => {
                    const bodyCell = document.createElement('td');

                    if (keys[index] === "Module") {
                        const innerTable = document.createElement("table");
                        const innerTableBody = document.createElement('tbody');
                        const innerTableHead = document.createElement('thead');
                        innerTable.append(innerTableHead);
                        innerTable.append(innerTableBody);

                        const trHead = document.createElement('tr')
                        innerTableHead.append(trHead);

                        Object.keys(value).forEach(key => {
                            const cell = document.createElement('td');
                            cell.append(key.replace('_', " "));
                            trHead.append(cell);
                        })

                        value.Assignment.forEach((ass, aInd) => {
                            const innerTableRow = document.createElement('tr');
                            const assignmentCell = document.createElement('td');
                            const weightingCell = document.createElement('td');
                            const learningOutcomeCell = document.createElement('td');
                            const volumeCell = document.createElement('td');

                            assignmentCell.append(ass);
                            weightingCell.append(value.weights[aInd]);
                            volumeCell.append(value.Volume[aInd]);
                            learningOutcomeCell.append(value["Learning_outcomes"][aInd]);

                            innerTableRow.append(assignmentCell);
                            innerTableRow.append(learningOutcomeCell);
                            innerTableRow.append(volumeCell);
                            innerTableRow.append(weightingCell);

                            innerTableBody.append(innerTableRow);
                        })
                        bodyCell.append(innerTable);
                    }
                    else bodyCell.append(value);

                    bodyRow.append(bodyCell);
                })
                document.getElementById('module-table-body').append(bodyRow);
            })
        });
}
