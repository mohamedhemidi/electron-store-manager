import { dialog } from 'electron'
import { jsPDF } from 'jspdf'
import moment from 'moment'
import { AmiriFont } from '../../assets/amiriFont'
const GenerateTiquetPDF = async (_event, args): Promise<void> => {
  const doc = new jsPDF({
    unit: 'mm',
    format: [80, 90] // Custom width for receipt-like layout
  })

  doc.addFileToVFS('Amiri-Regular.ttf', AmiriFont)
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal')
  doc.setFont('Amiri')

  const startX = 2 // Left padding
  let startY = 10 // Start from the top with some padding
  const lineHeight = 8 // Line height for each row

  doc.text(`Electron Store Manager`, 15, startY)

  startY += lineHeight
  doc.line(startX, startY, 75, startY)
  startY += lineHeight

  doc.setFontSize(10)
  doc.text(`Id : ${args.id}`, startX, startY)
  startY += lineHeight
  doc.text(`Name : ${args.name}`, startX, startY)
  startY += lineHeight
  doc.text(`Price : ${args.price} DZA`, startX, startY)

  startY += lineHeight
  doc.line(startX, startY, 75, startY)
  startY += lineHeight

  doc.text(`Due Date : ${moment(args.dueDate).format('DD/MM/YYYY h:mmA')}`, startX, startY)
  startY += lineHeight
  doc.text(`createdAt : ${moment(args.createdAt).format('DD/MM/YYYY h:mmA')}`, startX, startY)
  startY += lineHeight
  doc.text(`Generated At : ${moment().format('DD/MM/YYYY h:mmA')}`, startX, startY)

  const { filePath } = await dialog.showSaveDialog({
    title: 'Save PDF',
    defaultPath: `tiquet_${args.id}_${moment().format('YYYYMMDD_HHmmss')}.pdf`,
    // defaultPath: `generated-from-json.pdf`,
    filters: [{ name: 'PDFs', extensions: ['pdf'] }]
  })

  if (filePath) {
    doc.save(filePath)
  }
}
export default GenerateTiquetPDF
