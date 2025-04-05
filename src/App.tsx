import React, { useState, useRef } from 'react';
import './App.css';
import logo from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [labeledImage, setLabeledImage] = useState<string>('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o spinner
  // No topo do componente
  const [imagePath, setImagePath] = useState<string>(''); // Novo estado para o caminho
  const [annotationFormat, setAnnotationFormat] = useState<string>("label_studio");

  // Referência para o input de arquivos
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedClasses([...selectedClasses, value]);
    } else {
      setSelectedClasses(selectedClasses.filter(cls => cls !== value));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!files || selectedClasses.length === 0) {
      setMessage('Por favor, selecione pelo menos uma classe e envie os arquivos.');
      return;
    }

    setIsLoading(true); // Ativa o spinner

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));
    selectedClasses.forEach(cls => formData.append('classes', cls));
    formData.append("annotation_format", annotationFormat);


    if (imagePath.trim() !== '') {
      formData.append('base_path', imagePath);
    }
    
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setLabeledImage(data.labeled_image);
      } else {
        setMessage('Erro ao processar as imagens.');
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor.');
    } finally {
      setIsLoading(false); // Desativa o spinner (mesmo em caso de erro)
    }
  };

  const handleClearCache = async () => {
    try {
      const response = await fetch('http://localhost:8000/clear_cache');
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Exibe a mensagem de sucesso
        setLabeledImage(''); // Limpa a imagem visualizada
        setFiles(null); // Limpa o estado dos arquivos

        // Limpa o valor do input de arquivos
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Limpa a mensagem após 5 segundos
        setTimeout(() => {
          setMessage('');
        }, 5000);
      } else {
        setMessage(data.message); // Exibe a mensagem de erro
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="background-container">
      <div className="container">
        <img src={logo} width="100" alt="Logo" />
        <h1>AdaptLabelX</h1>
        <h2>Object Detection API</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="files"><strong>Envie seus Datasets e Selecione as classes</strong></label><br />
          <input
            type="file"
            id="files"
            name="files"
            multiple
            required
            onChange={handleFileChange}
            ref={fileInputRef} // Adicione a referência ao input
          /><br />

          {message && <div id="message"><h3>{message}</h3></div>}

          {labeledImage && (
            <>
              <p>Clique abaixo para visualizar as 5 primeiras e últimas imagens rotuladas🔎</p>
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={`data:image/png;base64,${labeledImage}`}
                    alt="Imagens Anotadas"
                    style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                  />
                </TransformComponent>
              </TransformWrapper>
              <div className="export-section">
                <a href="http://localhost:8000/export_separate_jsons" className="export-section btn btn-secondary">Exportar JSONs Separados</a>
                <a href="http://localhost:8000/export_consolidated_json" className="export-section btn btn-secondary">Exportar JSON Consolidado</a>
              </div>
              {/* Botão "Limpar Cache" fora do formulário */}
              <div className="cache-section">
                <button type="button" onClick={handleClearCache} className="cache-section btn btn-warning">Limpar Cache</button>
              </div>
            </>
          )}

          <div className="form-group mt-3">
            <label htmlFor="imagePath"><strong>Ou informe o caminho das imagens (servidor)</strong></label>
            <input
              type="text"
              id="imagePath"
              className="form-control"
              placeholder="Ex: /home/user/images/"
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
            />
          </div>

          <div className="format-selector">
          <p><strong>Formato das Anotações</strong></p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {["label_studio", "labelme"].map(format => (
              <div key={format}>
                <input
                  type="radio"
                  className="btn-check"
                  name="annotation_format"
                  id={format}
                  value={format}
                  onChange={(e) => setAnnotationFormat(e.target.value)}
                  checked={annotationFormat === format}
                />
                <label className={`btn btn-outline-${annotationFormat === format ? "success" : "secondary"}`} htmlFor={format}>
                  {format === "label_studio" ? "Label Studio" : "LabelMe"}
                </label>
              </div>
            ))}
          </div>
        </div>

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="ms-2">Processando...</span>
              </>
            ) : (
              'Iniciar Rotulagem'
            )}
          </button>

          <div className="checkbox-container">
            {[
              "person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat",
              "traffic_light", "fire_hydrant", "stop_sign", "parking_meter", "bench", "bird", "cat", "dog",
              "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports_ball", "kite",
              "baseball_bat", "baseball_glove", "skateboard", "surfboard", "tennis_racket", "bottle",
              "wine_glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich",
              "orange", "broccoli", "carrot", "hot_dog", "pizza", "donut", "cake", "chair", "couch",
              "potted_plant", "bed", "dining_table", "toilet", "tv", "laptop", "mouse", "remote",
              "keyboard", "cell_phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book",
              "clock", "vase", "scissors", "teddy_bear", "hair_drier", "toothbrush"
            ].map(cls => (
              <div key={cls}>
                <input
                  type="checkbox"
                  className="btn-check"
                  id={cls}
                  name="classes"
                  value={cls}
                  onChange={handleClassChange}
                />
                <label className="btn btn-outline-primary mb-2" htmlFor={cls}>{cls.replace('_', ' ').toUpperCase()}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;