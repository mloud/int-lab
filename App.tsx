
import React, { useState, useEffect } from 'react';
import { getScreenFromHash } from './routing';
import SubjectSelection from './components/common/SubjectSelection';
import OperacniSystemyMenu from './components/specializovana/operacni-systemy/OperacniSystemyMenu';
import FileSystemsMenu from './components/specializovana/operacni-systemy/FileSystemsMenu';
import FATGame from './components/specializovana/operacni-systemy/FATGame';
import AllocationGame from './components/specializovana/operacni-systemy/AllocationGame';
import DefragGame from './components/specializovana/operacni-systemy/DefragGame';
import ChkdskGame from './components/specializovana/operacni-systemy/ChkdskGame';
import ClusterSizeGame from './components/specializovana/operacni-systemy/ClusterSizeGame';
import WindowsInstallGame from './components/specializovana/operacni-systemy/WindowsInstallGame';
import ProcessMemoryMenu from './components/specializovana/operacni-systemy/ProcessMemoryMenu';
import MemoryStepperGame from './components/specializovana/operacni-systemy/MemoryStepperGame';
import MemoryAllocatorGame from './components/specializovana/operacni-systemy/MemoryAllocatorGame';
import CpuCycleGame from './components/specializovana/operacni-systemy/CpuCycleGame';
import LandingPage from './components/informatika/LandingPage';
import OsMenu from './components/informatika/operacni-systemy/OsMenu';
import OsMatchGame from './components/informatika/operacni-systemy/OsMatchGame';
import BootSequenceGame from './components/informatika/operacni-systemy/BootSequenceGame';
import FileExtensionGame from './components/informatika/operacni-systemy/FileExtensionGame';
import RamManagerGame from './components/informatika/operacni-systemy/RamManagerGame';
import ShortcutNinjaGame from './components/informatika/operacni-systemy/ShortcutNinjaGame';
import SplashScreen from './components/informatika/colors/SplashScreen';
import Menu from './components/informatika/colors/Menu';
import RGBDrawing from './components/informatika/colors/RGBDrawing';
import Quiz from './components/informatika/colors/Quiz';
import LinesMenu from './components/informatika/lines/LinesMenu';
import VectorDrawing from './components/informatika/lines/VectorDrawing';
import ShapePuzzle from './components/informatika/lines/ShapePuzzle';
import CompressionMenu from './components/informatika/compression/CompressionMenu';
import CompressionFormatsMenu from './components/informatika/compression/CompressionFormatsMenu';
import ImageCompressionGame from './components/informatika/compression/ImageCompressionGame';
import RleCompressionGame from './components/informatika/compression/RleCompressionGame';
import ImageSizeGame from './components/informatika/compression/ImageSizeGame';
import JpegSimGame from './components/informatika/compression/JpegSimGame';
import CompressionGame from './components/informatika/compression/CompressionGame';
import CustomCompression from './components/informatika/compression/CustomCompression';
import TextCompression from './components/informatika/compression/TextCompression';
import ChecksumGame from './components/informatika/compression/ChecksumGame';
import BinaryMenu from './components/informatika/binary/BinaryMenu';
import TeachersOffice from './components/informatika/binary/TeachersOffice';
import StudentCounting from './components/informatika/binary/StudentCounting';
import BinaryToDecimal from './components/informatika/binary/BinaryToDecimal';
import TruthTable from './components/informatika/binary/TruthTable';
import BinaryAddition from './components/informatika/binary/BinaryAddition';
import ModelsMenu from './components/informatika/models/ModelsMenu';
import TimetableGraph from './components/informatika/models/TimetableGraph';
import PathFindingTask from './components/informatika/models/PathFindingTask';
import BlatovTask from './components/informatika/models/BlatovTask';
import MSTTask from './components/informatika/models/MSTTask';
import ParallelProcesses from './components/informatika/models/ParallelProcesses';
import SpecializovanaMenu from './components/specializovana/SpecializovanaMenu';
import HardwareMenu from './components/informatika/hardware/HardwareMenu';
import PcBuilderGame from './components/informatika/hardware/PcBuilderGame';
import DataJourneyGame from './components/informatika/hardware/DataJourneyGame';
import HwSwSorterGame from './components/informatika/hardware/HwSwSorterGame';
import PcConfiguratorGame from './components/informatika/hardware/PcConfiguratorGame';
import DataUnitsMenu from './components/informatika/data-units/DataUnitsMenu';
import DataUnitsTheory from './components/informatika/data-units/DataUnitsTheory';
import DataUnitsPractice from './components/informatika/data-units/DataUnitsPractice';
import { Screen, Difficulty, Segment } from './types';
import { ROCKET_DATA, CAT_DATA, COMPUTER_DATA } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedData, setSelectedData] = useState<Segment[]>([]);
  const [levelName, setLevelName] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const screenToLoad = getScreenFromHash(window.location.hash);
      if (screenToLoad) {
        setCurrentScreen(screenToLoad);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStartLevel = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        setSelectedData(ROCKET_DATA);
        setLevelName('Raketa');
        break;
      case 'medium':
        setSelectedData(CAT_DATA);
        setLevelName('Kočka');
        break;
      case 'hard':
        setSelectedData(COMPUTER_DATA);
        setLevelName('Počítač');
        break;
    }
    setCurrentScreen('drawing');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <SubjectSelection
            onSelectInformatika={() => setCurrentScreen('informatika-menu')}
            onSelectSpecializovana={() => setCurrentScreen('specializovana-menu')}
          />
        );
      case 'informatika-menu':
        return (
          <LandingPage
            onStartColors={() => setCurrentScreen('splash')}
            onStartLines={() => setCurrentScreen('lines-menu')}
            onStartCompression={() => setCurrentScreen('compression-menu')}
            onStartCompressionFormats={() => setCurrentScreen('compression-formats-menu')}
            onStartBinary={() => setCurrentScreen('binary-menu')}
            onStartDataUnits={() => setCurrentScreen('data-units-menu')}
            onStartModels={() => setCurrentScreen('models-menu')}
            onStartHardware={() => setCurrentScreen('hardware-menu')}
            onStartOs={() => setCurrentScreen('informatika-os-menu')}
            onBack={() => setCurrentScreen('landing')}
          />
        );
      case 'informatika-os-menu':
        return (
          <OsMenu
            onBack={() => setCurrentScreen('informatika-menu')}
            onStartMatchGame={() => setCurrentScreen('os-match-game')}
            onStartBootSequence={() => setCurrentScreen('boot-sequence-game')}
            onStartFileExtension={() => setCurrentScreen('file-extension-game')}
            onStartRamManager={() => setCurrentScreen('ram-manager-game')}
            onStartShortcutNinja={() => setCurrentScreen('shortcut-ninja-game')}
          />
        );
      case 'os-match-game':
        return <OsMatchGame onBack={() => setCurrentScreen('informatika-os-menu')} />;
      case 'boot-sequence-game':
        return <BootSequenceGame onBack={() => setCurrentScreen('informatika-os-menu')} />;
      case 'file-extension-game':
        return <FileExtensionGame onBack={() => setCurrentScreen('informatika-os-menu')} />;
      case 'ram-manager-game':
        return <RamManagerGame onBack={() => setCurrentScreen('informatika-os-menu')} />;
      case 'shortcut-ninja-game':
        return <ShortcutNinjaGame onBack={() => setCurrentScreen('informatika-os-menu')} />;
      case 'specializovana-menu':
        return (
          <SpecializovanaMenu
            onBack={() => setCurrentScreen('landing')}
            onStartOperacniSystemy={() => setCurrentScreen('operacni-systemy-menu')}
          />
        );
      case 'hardware-menu':
        return (
          <HardwareMenu
            onBack={() => setCurrentScreen('informatika-menu')}
            onStartPcBuilder={() => setCurrentScreen('pc-builder-game')}
            onStartDataJourney={() => setCurrentScreen('data-journey-game')}
            onStartHwSwSorter={() => setCurrentScreen('hw-sw-sorter-game')}
            onStartCustomPcBuilder={() => setCurrentScreen('pc-configurator-game')}
          />
        );
      case 'pc-builder-game':
        return <PcBuilderGame onBack={() => setCurrentScreen('hardware-menu')} />;
      case 'data-journey-game':
        return <DataJourneyGame onBack={() => setCurrentScreen('hardware-menu')} />;
      case 'hw-sw-sorter-game':
        return <HwSwSorterGame onBack={() => setCurrentScreen('hardware-menu')} />;
      case 'pc-configurator-game':
        return <PcConfiguratorGame onBack={() => setCurrentScreen('hardware-menu')} />;
      case 'operacni-systemy-menu':
        return (
          <OperacniSystemyMenu
            onBack={() => setCurrentScreen('specializovana-menu')}
            onStartFileSystemsMenu={() => setCurrentScreen('file-systems-menu')}
            onStartWindowsInstall={() => setCurrentScreen('windows-install-game')}
            onStartProcessMemory={() => setCurrentScreen('process-memory-menu')}
          />
        );
      case 'file-systems-menu':
        return (
          <FileSystemsMenu
            onBack={() => setCurrentScreen('operacni-systemy-menu')}
            onStartFATGame={() => setCurrentScreen('fat-game')}
            onStartAllocationGame={() => setCurrentScreen('allocation-game')}
            onStartDefragGame={() => setCurrentScreen('defrag-game')}
            onStartChkdskGame={() => setCurrentScreen('chkdsk-game')}
            onStartClusterSizeGame={() => setCurrentScreen('cluster-size-game')}
          />
        );
      case 'fat-game':
        return (
          <FATGame onBack={() => setCurrentScreen('file-systems-menu')} />
        );
      case 'allocation-game':
        return (
          <AllocationGame onBack={() => setCurrentScreen('file-systems-menu')} />
        );
      case 'defrag-game':
        return (
          <DefragGame onBack={() => setCurrentScreen('file-systems-menu')} />
        );
      case 'chkdsk-game':
        return (
          <ChkdskGame onBack={() => setCurrentScreen('file-systems-menu')} />
        );
      case 'windows-install-game':
        return (
          <WindowsInstallGame onBack={() => setCurrentScreen('operacni-systemy-menu')} />
        );
      case 'cluster-size-game':
        return (
          <ClusterSizeGame onBack={() => setCurrentScreen('file-systems-menu')} />
        );
      case 'process-memory-menu':
        return (
          <ProcessMemoryMenu
            onBack={() => setCurrentScreen('operacni-systemy-menu')}
            onStartMemoryStepper={() => setCurrentScreen('memory-stepper-game')}
            onStartMemoryAllocator={() => setCurrentScreen('memory-allocator-game')}
            onStartCpuCycle={() => setCurrentScreen('cpu-cycle-game')}
          />
        );
      case 'memory-stepper-game':
        return <MemoryStepperGame onBack={() => setCurrentScreen('process-memory-menu')} />;
      case 'memory-allocator-game':
        return <MemoryAllocatorGame onBack={() => setCurrentScreen('process-memory-menu')} />;
      case 'cpu-cycle-game':
        return <CpuCycleGame onBack={() => setCurrentScreen('process-memory-menu')} />;
      case 'binary-menu':
        return (
          <BinaryMenu
            onStartTeachers={() => setCurrentScreen('teachers-office')}
            onStartCounting={() => setCurrentScreen('student-counting')}
            onStartBinaryToDecimal={() => setCurrentScreen('binary-to-decimal')}
            onStartTruthTable={() => setCurrentScreen('truth-table')}
            onStartAddition={() => setCurrentScreen('binary-addition')}
            onBack={() => setCurrentScreen('informatika-menu')}
          />
        );
      case 'teachers-office':
        return <TeachersOffice onBack={() => setCurrentScreen('binary-menu')} />;
      case 'student-counting':
        return <StudentCounting onBack={() => setCurrentScreen('binary-menu')} />;
      case 'binary-to-decimal':
        return <BinaryToDecimal onBack={() => setCurrentScreen('binary-menu')} />;
      case 'truth-table':
        return <TruthTable onBack={() => setCurrentScreen('binary-menu')} />;
      case 'binary-addition':
        return <BinaryAddition onBack={() => setCurrentScreen('binary-menu')} />;
      case 'models-menu':
        return (
          <ModelsMenu
            onStartGraphs={() => setCurrentScreen('timetable-graph')}
            onStartPathFinding={() => setCurrentScreen('path-finding')}
            onStartBlatov={() => setCurrentScreen('blatov-task')}
            onStartMST={() => setCurrentScreen('mst-task')}
            onStartParallel={() => setCurrentScreen('parallel-processes')}
            onBack={() => setCurrentScreen('informatika-menu')}
          />
        );
      case 'timetable-graph':
        return <TimetableGraph onBack={() => setCurrentScreen('models-menu')} />;
      case 'path-finding':
        return <PathFindingTask onBack={() => setCurrentScreen('models-menu')} />;
      case 'blatov-task':
        return <BlatovTask onBack={() => setCurrentScreen('models-menu')} />;
      case 'mst-task':
        return <MSTTask onBack={() => setCurrentScreen('models-menu')} />;
      case 'parallel-processes':
        return <ParallelProcesses onBack={() => setCurrentScreen('models-menu')} />;
      case 'compression-menu':
        return (
          <CompressionMenu
            onStartGame={() => setCurrentScreen('compression-game')}
            onStartText={() => setCurrentScreen('text-compression')}
            onStartChecksum={() => setCurrentScreen('checksum-game')}
            onBack={() => setCurrentScreen('informatika-menu')}
          />
        );
      case 'compression-formats-menu':
        return (
          <CompressionFormatsMenu 
            onStartImageCompression={() => setCurrentScreen('image-compression-chapter')}
            onStartRle={() => setCurrentScreen('rle-compression-chapter')}
            onStartSize={() => setCurrentScreen('image-size-chapter')}
            onStartJpeg={() => setCurrentScreen('jpeg-sim-chapter')}
            onBack={() => setCurrentScreen('informatika-menu')} 
          />
        );
      case 'image-compression-chapter':
        return (
          <ImageCompressionGame onBack={() => setCurrentScreen('compression-formats-menu')} />
        );
      case 'rle-compression-chapter':
        return (
          <RleCompressionGame onBack={() => setCurrentScreen('compression-formats-menu')} />
        );
      case 'image-size-chapter':
        return (
          <ImageSizeGame onBack={() => setCurrentScreen('compression-formats-menu')} />
        );
      case 'jpeg-sim-chapter':
        return (
          <JpegSimGame onBack={() => setCurrentScreen('compression-formats-menu')} />
        );
      case 'data-units-menu':
        return (
          <DataUnitsMenu
            onStartTheory={() => setCurrentScreen('data-units-theory')}
            onStartPractice={() => setCurrentScreen('data-units-practice')}
            onBack={() => setCurrentScreen('informatika-menu')}
          />
        );
      case 'data-units-theory':
        return <DataUnitsTheory onBack={() => setCurrentScreen('data-units-menu')} />;
      case 'data-units-practice':
        return <DataUnitsPractice onBack={() => setCurrentScreen('data-units-menu')} />;
      case 'compression-game':
        return (
          <CompressionGame
            onBack={() => setCurrentScreen('compression-menu')}
            onStartCustom={() => setCurrentScreen('custom-compression')}
          />
        );
      case 'custom-compression':
        return (
          <CustomCompression onBack={() => setCurrentScreen('compression-game')} />
        );
      case 'text-compression':
        return (
          <TextCompression onBack={() => setCurrentScreen('compression-menu')} />
        );
      case 'checksum-game':
        return (
          <ChecksumGame onBack={() => setCurrentScreen('compression-menu')} />
        );
      case 'lines-menu':
        return (
          <LinesMenu
            onShapePuzzle={() => setCurrentScreen('shape-puzzle')}
            onVectorDrawing={() => setCurrentScreen('vector-drawing')}
            onLineDrawing={() => setCurrentScreen('line-drawing')}
            onBack={() => setCurrentScreen('informatika-menu')}
          />
        );
      case 'shape-puzzle':
        return (
          <ShapePuzzle onBack={() => setCurrentScreen('lines-menu')} />
        );
      case 'vector-drawing':
        return (
          <VectorDrawing
            mode="points"
            onBack={() => setCurrentScreen('lines-menu')}
          />
        );
      case 'line-drawing':
        return (
          <VectorDrawing
            mode="lines"
            onBack={() => setCurrentScreen('lines-menu')}
          />
        );
      case 'splash':
        return (
          <SplashScreen
            onEnter={() => setCurrentScreen('menu')}
            onQuiz={() => setCurrentScreen('quiz')}
            onBack={() => setCurrentScreen('informatika-menu')}
          />
        );
      case 'menu':
        return <Menu onStart={handleStartLevel} onBack={() => setCurrentScreen('splash')} />;
      case 'drawing':
        return (
          <RGBDrawing
            onBack={() => setCurrentScreen('menu')}
            initialSegments={selectedData}
            title={levelName}
          />
        );
      case 'quiz':
        return <Quiz onBack={() => setCurrentScreen('splash')} />;
      default:
        return (
          <SubjectSelection
            onSelectInformatika={() => setCurrentScreen('informatika-menu')}
            onSelectOperacniSystemy={() => setCurrentScreen('operacni-systemy-menu')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc]">
      {renderScreen()}
    </div>
  );
};

export default App;
