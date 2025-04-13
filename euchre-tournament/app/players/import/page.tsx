"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileSpreadsheet, Home, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export default function ImportPlayersPage() {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Check if file is CSV or Excel
      const fileType = selectedFile.type
      if (
        fileType === "text/csv" ||
        fileType === "application/vnd.ms-excel" ||
        fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setFile(selectedFile)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or Excel file",
          variant: "destructive",
        })
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      // Check if file is CSV or Excel
      const fileType = droppedFile.type
      if (
        fileType === "text/csv" ||
        fileType === "application/vnd.ms-excel" ||
        fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setFile(droppedFile)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or Excel file",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        // Simulate processing delay
        setTimeout(() => {
          toast({
            title: "Import successful",
            description: "Players have been imported successfully",
          })
          setIsUploading(false)
          router.push("/players")
        }, 500)
      }
    }, 300)
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-md">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/" title="Home">
            <Home className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/players">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Players
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import Players</CardTitle>
          <CardDescription>Upload a CSV or Excel file to import multiple players at once</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xls,.xlsx"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />

            {!file ? (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-1">Supports CSV and Excel files</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {isUploading ? (
                  <div className="space-y-2">
                    <FileSpreadsheet className="h-10 w-10 mx-auto text-primary" />
                    <p className="text-sm font-medium">{file.name}</p>
                    <Progress value={uploadProgress} className="h-2 w-full" />
                    <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile()
                      }}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-sm">
            <p className="font-medium">File format requirements:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
              <li>First row should contain column headers</li>
              <li>Required column: "Player Name" or "Name"</li>
              <li>Optional columns: Email, ID, Notes</li>
              <li>Maximum 100 players per import</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.push("/players")} disabled={isUploading}>
            Cancel
          </Button>
          <Button type="button" onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? "Importing..." : "Import Players"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
